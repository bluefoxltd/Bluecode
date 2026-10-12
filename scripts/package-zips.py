import os
import zipfile
import shutil

def make_zip(source_dir, output_zip, exclude_dirs=None, exclude_exts=None, exclude_names=None):
    if exclude_dirs is None:
        exclude_dirs = set()
    if exclude_exts is None:
        exclude_exts = set()
    if exclude_names is None:
        exclude_names = set()

    with zipfile.ZipFile(output_zip, "w", zipfile.ZIP_DEFLATED) as zf:
        for root, dirs, files in os.walk(source_dir):
            dirs[:] = [d for d in dirs if d not in exclude_dirs]
            for file in files:
                ext = os.path.splitext(file)[1].lower()
                if ext in exclude_exts or file in exclude_names:
                    continue
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, source_dir)
                zf.write(full_path, rel_path)

if __name__ == "__main__":
    # Ensure public directory exists
    os.makedirs("public", exist_ok=True)

    # 1. Package cPanel zip from dist if dist exists
    if os.path.exists("dist"):
        make_zip(
            source_dir="dist",
            output_zip="public/bluecode-cpanel-ready.zip",
            exclude_exts={".zip"}
        )

    # 2. Package source code zip from root
    make_zip(
        source_dir=".",
        output_zip="public/bluecode-source-code.zip",
        exclude_dirs={"node_modules", "dist", ".git", ".cache", "cpanel_build", ".turbo"},
        exclude_exts={".zip"}
    )

    # Sync to dist if present
    if os.path.exists("dist"):
        if os.path.exists("public/bluecode-cpanel-ready.zip"):
            shutil.copy("public/bluecode-cpanel-ready.zip", "dist/bluecode-cpanel-ready.zip")
        if os.path.exists("public/bluecode-source-code.zip"):
            shutil.copy("public/bluecode-source-code.zip", "dist/bluecode-source-code.zip")
    print("Packages created successfully.")
