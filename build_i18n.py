import yaml
import json
import os
import re

def main():
    # Load translations from locale directory
    translations = {}
    locale_dir = 'locale'
    
    if not os.path.exists(locale_dir):
        print(f"Error: {locale_dir} directory not found.")
        return

    for filename in os.listdir(locale_dir):
        if not filename.endswith('.yaml'):
            continue
            
        lang = filename[:-5] # remove .yaml
        filepath = os.path.join(locale_dir, filename)
        
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            file_data = yaml.safe_load(content)
            
            # If the file was incorrectly split and has leading indentation on all lines,
            # safe_load might return a dict with None values or just fail to nest.
            # We check if we need to dedent.
            if file_data and all(v is None for v in file_data.values()):
                import textwrap
                file_data = yaml.safe_load(textwrap.dedent(content))

            if not file_data:
                continue
            
            # The structure is { lang_code: { module_name: { key: val } } }
            for actual_lang, modules in file_data.items():
                if not isinstance(modules, dict):
                    continue
                for module_name, messages in modules.items():
                    if not isinstance(messages, dict):
                        continue
                        
                    if module_name not in translations:
                        translations[module_name] = {}
                    
                    # Clean up messages (strip whitespace)
                    cleaned_messages = {}
                    for k, v in messages.items():
                        if isinstance(v, str):
                            cleaned_messages[k] = v.strip()
                        else:
                            cleaned_messages[k] = v
                            
                    translations[module_name][actual_lang] = cleaned_messages

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
