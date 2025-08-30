# HKUST AC Addon

This is a chrome extension for HKUST Air Conditioner System.

## Usage

There are two ways to install the extension:
1. Install through [Google Web Store](https://chromewebstore.google.com/detail/hkust-ac-addon/adkammmhnjceelnimfmgeokneakaaafa) (recommended)
2. Download the latest zip file from [Releases](https://github.com/tonyyuyiding/hkust-ac-addon/releases) and install by yourself

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

1. Check release notes in `releases` and the version number in `public/manifest.json`. Make sure they have been updated
2. Tag the commit to be released with version number
3. Run `rm -r dist` and then `npm run build`
4. zip all files in `dist` to get the `.zip` file to be released. Rename the `.zip` file with version number
5. Push the commit and tag to github. Create a release using the tag created in step 2, notes in `releases` and the `.zip` file created in step 4.

### Notes

- Remember to put your change in the corresponding `.md` file in `releases` directory