#!/bin/env python3
 
import json

def get_current_version(manifest_data):
    if 'version' not in manifest_data:
        raise Exception('version not found in manifest.json')
    
    version = manifest_data['version']
    version = version.split('.')

    if len(version) != 2:
        version.append('0')

    if len(version) != 3:
        version.append('0')

    return version[0:3]  # return major, minor, patch version only. e.g. 1.0.0 -> 1.0.0, 1.0.1 -> 1.0.1, 1.1.0 -> 1.1.0, 1.1

def read_json(filename):
    with open(filename) as f:
        return json.load(f)

def write_json(filename, data):
    with open(filename, 'w') as f:
        json.dump(data, f, indent=4)

def increment_minor_version(version):
    version[2] = str(int(version[2]) + 1)
    return '.'.join(version)

def write_json(filename, data):
    with open(filename, 'w') as f:
        json.dump(data, f, indent=4)

def main():
    data = read_json('manifest.json')
    current_version = get_current_version(data)
    print(current_version)
    new_version = increment_minor_version(current_version)
    print(new_version)
    data['version'] = new_version
    write_json('manifest.json', data)

main()
