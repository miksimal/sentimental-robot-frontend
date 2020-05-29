## Available Scripts

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

### `npm run deploy` and `npm run postdeploy`

Deploy deletes the files currently in the s3 bucket and adds the new bundle.

Postdeploy invalidates the cache of the CloudFront distribution to ensure it uses the new site live in the s3 bucket. Note: it seems that the cache gets automatically invalidated actually -- you'll be able to see in the terminal if that is happening.