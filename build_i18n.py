import yaml
import json
import os
import re

def main():
    # Load translations from YAML
    yaml_path = 'i18n.yaml'
    if not os.path.exists(yaml_path):
        print(f"Error: {yaml_path} not found.")
        return

    with open(yaml_path, 'r', encoding='utf-8') as f:
        translations = yaml.safe_load(f)

    modules_dir = 'modules'
    if not os.path.exists(modules_dir):
        print(f"Error: directory {modules_dir} not found.")
        return

    # Process all JS files in modules directory
    for filename in os.listdir(modules_dir):
        if not filename.endswith('.js'):
            continue
            
        module_name = filename[:-3] # remove .js
        
        # Determine the key to look up in translations
        # Most match the filename, but we can also handle mapping if needed
        # e.g., positive-coordinates uses integer-coordinates
        dict_key = module_name
        if module_name == 'positive-coordinates':
            dict_key = 'integer-coordinates'
            
        if dict_key not in translations:
            print(f"Warning: No translations found for module '{module_name}' (expected key '{dict_key}').")
            continue
            
        module_dict = translations[dict_key]
        
        # Serialize to formatted JSON string
        json_str = json.dumps(module_dict, indent=4, ensure_ascii=False)
        
        # We want to format the JSON string slightly to fit the JS syntax better
        # (optional, but nice and my personal preference so I'm keeping it)
        
        filepath = os.path.join(modules_dir, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Look for the injection block
        pattern = re.compile(r'/\*\s*I18N_START\s*\*/.*?/\*\s*I18N_END\s*\*/', re.DOTALL)
        
        if not pattern.search(content):
            print(f"Warning: No I18N_START/I18N_END block found in {filename}.")
            continue
            
        replacement = f"/* I18N_START */ {json_str} /* I18N_END */"
        new_content = pattern.sub(lambda m: replacement, content)
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filename}")
        else:
            print(f"No changes needed for {filename}")

if __name__ == "__main__":
    main()
