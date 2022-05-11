# VertiGIS FM Activities

[![CI/CD](https://github.com/geocortex/workflow-activities-fm/workflows/CI/CD/badge.svg)](https://github.com/geocortex/workflow-activities-fm/actions)
[![npm](https://img.shields.io/npm/v/@geocortex/workflow-activities-fm)](https://www.npmjs.com/package/@vertigis/workflow-activities-fm)

This project contains activities for interacting with the [VertiGIS FM](https://prooffice.vertigis.com/en/) OData services in a [VertiGIS Studio Workflow](https://www.vertigisstudio.com/products/vertigis-studio-workflow/).

## Requirements

### VertiGIS Studio Workflow Versions

The VertiGIS FM activities are designed to work with VertiGIS Studio Workflow versions `5.27` and above.

### VertiGIS FM Versions

The VertiGIS FM activities are designed to work VertiGIS FM versions `10` and above.

## Usage

To use the VertiGIS FM activities in [VertiGIS Studio Workflow Designer](https://apps.vertigisstudio.com/workflow/designer/) you need to register an activity pack and then add the activities to a workflow.

### Register the VertiGIS FM activity pack

1. Sign in to ArcGIS Online or Portal for ArcGIS
1. Go to **My Content**
1. Select **Add Item > An application**
    - Type: `Web Mapping`
    - Purpose: `Ready To Use`
    - API: `JavaScript`
    - URL: The URL to this activity pack manifest
        - Use https://unpkg.com/@vertigis/workflow-activities-fm/activitypack.json for the latest version
        - Use https://unpkg.com/@vertigis/workflow-activities-fm@1.0.0/activitypack.json for a specific version
    - Title: Your desired title
    - Tags: Must include `geocortex-workflow-activity-pack`
1. Reload [VertiGIS Studio Workflow Designer](https://apps.vertigisstudio.com/workflow/designer/)
1. The VertiGIS FM activities will now appear in the activity toolbox in a `VertiGIS FM` category

### Use the VertiGIS FM activities in a workflow

1. Establish a connection to the VertiGIS FM service
    1. Add the `Create VertiGIS FM Service` activity to a workflow
    1. Set the `URL` input to the root URL of your VertiGIS FM server. For example, `https://dev.gebman.com/`.
    1. If you have a username and password, assign them to the `Username` and `Password` inputs
    - **IMPORTANT:** tokens and passwords are credentials that should not be hard coded into workflows. These values should be acquired by the workflow at runtime from the end user or from another secure system.
1. Use the VertiGIS FM service
    1. Add one of the other VertiGIS FM activities to the workflow. For example, `Get VertiGIS FM OData Collection`.
    1. Set the `Service` input of the activity to be the output of the `Create VertiGIS FM Service` activity
        - Typically this would use an expression like `=$fmService1.service`
    1. Supply any additional inputs to the activity
    1. Supply the `result` output of the activity to the inputs of other activities in the workflow
1. Run the workflow

## Development

This project was bootstrapped with the [VertiGIS Studio Workflow SDK](https://github.com/geocortex/vertigis-workflow-sdk). Before you can use your activity pack in the [VertiGIS Studio Workflow Designer](https://apps.geocortex.com/workflow/designer/), you will need to [register the activity pack](https://developers.geocortex.com/docs/workflow/sdk-web-overview#register-the-activity-pack).

## Available Scripts

Inside the newly created project, you can run some built-in commands:

### `npm run generate`

Interactively generate a new activity or form element.

### `npm start`

Runs the project in development mode. Your activity pack will be available at [http://localhost:5000/main.js](http://localhost:5000/main.js). The HTTPS certificate of the development server is a self-signed certificate that web browsers will warn about. To work around this open [`https://localhost:5000/main.js`](https://localhost:5000/main.js) in a web browser and allow the invalid certificate as an exception. For creating a locally-trusted HTTPS certificate see the [Configuring a HTTPS Certificate](https://developers.geocortex.com/docs/workflow/sdk-web-overview/#configuring-a-https-certificate) section on the [VertiGIS Studio Developer Center](https://developers.geocortex.com/docs/workflow/overview/).

### `npm run build`

Builds the activity pack for production to the `build` folder. It optimizes the build for the best performance.

Your custom activity pack is now ready to be deployed!

See the [section about deployment](https://developers.geocortex.com/docs/workflow/sdk-web-overview/#deployment) in the [VertiGIS Studio Developer Center](https://developers.geocortex.com/docs/workflow/overview/) for more information.

## Documentation

Find [further documentation on the SDK](https://developers.geocortex.com/docs/workflow/sdk-web-overview/) on the [VertiGIS Studio Developer Center](https://developers.geocortex.com/docs/workflow/overview/)
