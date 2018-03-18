# cmc-rail
*cmc-rail* is a single-page application for requesting and displaying live National Rail departures information.

## Usage
### Configuration

*cmc-rail*'s configuration options are stored in *config/config.json*.

#### *config/config.json* example
```JSON
{
  "DarwinApiProxy": "https://locationof.darwin-web-proxy:9001",
  "DarwinToken": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
}
```

##### DarwinApiProxy
*cmc-rail* cannot connect to National Rail's Darwin API, as it has glitchy HTTPS, and does not support CORS, which makes it a bit of a challenge for client-side web apps. Rather than shimming a hardcoded CORS proxy into the *national-rail-darwin* module, this project is designed to work with an instance of [darwin-web-proxy](https://github.com/jonlinnell/darwin-web-proxy).

##### DarwinToken
Access to National Rail's Darwin API requires registration of the app, and use of an API key. More information is available on the [National Rail website](http://www.nationalrail.co.uk/100296.aspx). Once obtained, the key should be added to the *config/config.json* file.

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
