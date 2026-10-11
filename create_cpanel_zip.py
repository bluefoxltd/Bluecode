import os
import shutil
import zipfile
import subprocess

def main():
    print("1. Running npm run build...")
    subprocess.run(["npm", "run", "build"], check=True)

    dist_dir = "dist"
    cpanel_staging = "cpanel_build"

    if os.path.exists(cpanel_staging):
        shutil.rmtree(cpanel_staging)
    os.makedirs(cpanel_staging, exist_ok=True)

    print("2. Copying dist files to cpanel_build staging...")
    for item in os.listdir(dist_dir):
        if item.endswith(".zip"):
            continue
        s = os.path.join(dist_dir, item)
        d = os.path.join(cpanel_staging, item)
        if os.path.isdir(s):
            shutil.copytree(s, d)
        else:
            shutil.copy2(s, d)

    print("3. Creating .htaccess for cPanel Apache...")
    htaccess_content = """# Blue Code - cPanel Apache Configuration
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Enable GZIP Compression for maximum performance
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css application/javascript application/json application/xml image/svg+xml
</IfModule>

# Browser Caching Headers
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresDefault "access plus 2 days"
</IfModule>

# Security Headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-XSS-Protection "1; mode=block"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
"""
    with open(os.path.join(cpanel_staging, ".htaccess"), "w") as f:
        f.write(htaccess_content)

    print("4. Creating robots.txt...")
    robots_content = """User-agent: *
Allow: /
"""
    with open(os.path.join(cpanel_staging, "robots.txt"), "w") as f:
        f.write(robots_content)

    print("5. Creating README_CPANEL_INSTRUCTIONS.txt...")
    instructions = """========================================================================
BLUE CODE - CPANEL DEPLOYMENT INSTRUCTIONS
Website: Blue Code (Kathmandu, Nepal)
Contact: +977 9715971505 | info@bluecode.com
========================================================================

HOW TO HOST THIS WEBSITE ON CPANEL (1-MINUTE SETUP):

1. LOG IN TO YOUR CPANEL
   Go to your web hosting control panel (e.g., https://yourdomain.com:2083 or via your host's dashboard).

2. OPEN FILE MANAGER
   In cPanel, click on "File Manager" under the "Files" section.

3. GO TO public_html
   Navigate into the "public_html" directory (this is the root directory for your primary domain).
   If you are hosting on an Addon Domain or Subdomain, navigate to that domain's folder instead.

4. UPLOAD THIS ZIP FILE
   Click the "Upload" button on the top toolbar in File Manager.
   Select this "bluecode-cpanel-ready.zip" file from your computer and wait for it to reach 100%.

5. EXTRACT THE ZIP FILE
   Return to File Manager, select "bluecode-cpanel-ready.zip", right-click on it, and select "Extract" (or click "Extract" on the top bar).
   Extract it into the current folder (/public_html).

6. VERIFY YOUR FILES
   You should now see:
   - index.html
   - .htaccess
   - assets/ (contains bundled CSS and JavaScript)
   - robots.txt
   
   (Note: In cPanel File Manager, make sure "Show Hidden Files (dotfiles)" is enabled in Settings at the top-right if you don't see .htaccess).

7. DONE!
   Open your domain in any browser (e.g., https://yourdomain.com).
   Your complete Blue Code website is now live with all interactive 3D ASCII animations, pricing tables, and WhatsApp integrations!

========================================================================
SUPPORT & INQUIRIES:
Blue Code · Kathmandu, Nepal
WhatsApp / Phone: +977 9715971505
========================================================================
"""
    with open(os.path.join(cpanel_staging, "README_CPANEL_INSTRUCTIONS.txt"), "w") as f:
        f.write(instructions)

    print("6. Creating ZIP file: public/bluecode-cpanel-ready.zip and root...")
    os.makedirs("public", exist_ok=True)
    zip_target_public = os.path.join("public", "bluecode-cpanel-ready.zip")
    zip_target_root = "bluecode-cpanel-ready.zip"

    with zipfile.ZipFile(zip_target_public, "w", zipfile.ZIP_DEFLATED) as zf:
        for root, dirs, files in os.walk(cpanel_staging):
            for file in files:
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, cpanel_staging)
                zf.write(full_path, rel_path)

    shutil.copy2(zip_target_public, zip_target_root)
    print(f"SUCCESS: Created {zip_target_public} and {zip_target_root}")

    # Also create full source code zip
    source_zip_public = os.path.join("public", "bluecode-source-code.zip")
    source_zip_root = "bluecode-source-code.zip"
    with zipfile.ZipFile(source_zip_public, "w", zipfile.ZIP_DEFLATED) as zf:
        for folder in ["src", "public"]:
            for root, dirs, files in os.walk(folder):
                for file in files:
                    if file.endswith(".zip"):
                        continue
                    full_path = os.path.join(root, file)
                    zf.write(full_path, full_path)
        for fname in ["index.html", "package.json", "tsconfig.json", "vite.config.ts", "metadata.json"]:
            if os.path.exists(fname):
                zf.write(fname, fname)

    shutil.copy2(source_zip_public, source_zip_root)
    print(f"SUCCESS: Created {source_zip_public} and {source_zip_root}")

if __name__ == "__main__":
    main()
