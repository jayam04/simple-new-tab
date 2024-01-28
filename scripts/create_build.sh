#!/bin/bash

# Define the source folder and zip file name
source_folder=$1
zip_file_base="simple-new-tab"
json_file="manifest.json"

# Define the destination folder (builds folder)
builds_folder="$source_folder/builds"

# Change to the source folder
cd "$source_folder" || exit 1


# Check if jq is installed
if ! command -v jq &> /dev/null; then
  echo "jq is not installed. Please install jq first."
  exit 1
fi

# Read the version from the JSON file using jq
version=$(jq -r '.version' "$json_file")
echo "Version: $version"


# Create a zip file excluding the builds folder
zip_file="$zip_file_base-v$version.zip"
zip -r "$zip_file" * -x "builds/*" -x "scripts/*"

# Move the zip file to the builds folder
mv "$zip_file" "builds"

echo "Zip file created and moved to builds folder."
