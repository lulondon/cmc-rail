# cmc-rail
*cmc-rail* is a single-page application for requesting and displaying live National Rail departures information. It is designed specifically for Loughborough University London, and has some hardcoded elements that reflect this.

## Usage
### Configuration
Access to National Rail's Darwin API requires registration of the app, and use of an API key. More information is available on the [National Rail website](http://www.nationalrail.co.uk/100296.aspx).

Once obtained, the keys should be added to the *.env* file in the project root.

*.env*:
```
DARWIN_TOKEN=<your Darwin API token here>
```

### National Rail CORS proxy fix
The National Rail Darwin API doesn't support CORS, making it difficult to use with Webpack/client-side apps. As a (temporary) fix, all APi calls must be made through a CORS proxy to append the appropriate HTTP headers. As a temporary shim, please run the below command to insert a CORS proxy to the HTTP requests:
```shell
./misc/nr-cors-fix.sh
```
Eventually, either I will find a suitable alternative, or fork the *national-rail-darwin* module's code and build support for an optional CORS proxy.

### Build
First install dependencies:
```shell
yarn
```

Then create an optimised production build
```shell
yarn build
```

... or substitute the equivalent *npm* commands, if *yarn* is not available.
```shell
npm install
npm run build
```

The resulting HTML file, JavaScript bundle, and associated assets are now available in *./dist*
