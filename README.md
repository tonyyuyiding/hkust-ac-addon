# HKUST AC Addon

This is a chrome extension for HKUST Air Conditioner System.

## Usage

There are two ways to install the extension:
1. Download the latest zip file from [Releases](https://github.com/tonyyuyiding/hkust-ac-addon/releases) and install by yourself
2. Install through Google Web Store (coming soon)

After installation, you will be able to see a new option:

![Extension Screenshot](public/img/ss.png)

Type the number of minutes that you want the AC to keep running, then click SET button. This will also power on the AC if it is currently off.

## Issues

The project will be actively maintained for at least one semester. That is, until 31 Dec 2025. Feel free to create an issue for bugs or new feature suggestion!

## Development

### Build from Source

```bash
npm install
npm run build
```

### Release Procedure

1. Check release note in release
2. Tag the commit to be released with version number
3. Run `rm -r dist` and then `npm run build`
4. zip all files in `dist` to get the `.zip` file to be released. Rename the `.zip` file with version number
5. Push the commit and tag to github. Create a release using notes in `releases` and upload the `.zip` file

### Notes

- Remember to put your change in the corresponding `.md` file in `releases` directory