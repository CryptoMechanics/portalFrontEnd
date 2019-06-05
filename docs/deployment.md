# Worbli V2 Front End

Production( branch: master )
[![Build Status](https://travis-ci.org/worbli/portalV2FrontEnd.svg?branch=master)](https://travis-ci.org/worbliportalV2FrontEnd)

Stage( branch: uat )
[![Build Status](https://travis-ci.org/worbli/portalV2FrontEnd.svg?branch=uat)](https://travis-ci.org/worbli/portalV2FrontEnd)

Dev( branch: dev )
[![Build Status](https://travis-ci.org/worbli/portalV2FrontEnd.svg?branch=dev)](https://travis-ci.org/worbli/portalV2FrontEnd)

## Dev
To be built

**Account**: dev
**Branch**: dev  
**URL**: https://portal.dev.worbli.io  

**Pipeline**: portal-ui-dev  
**S3 Bucket**: portal-dev-worbli-io

***

## Stage
Configured to build on any events against the uat branch of the github repository.  Automatically deployed if the pipeline run is successful.

**Account**: dev
**Branch**: uat  
**URL**: https://portal.stage.worbli.io  

**Pipeline**: portal-ui-stage  
**S3 Bucket**: portal-stage-worbli-io

***

## Production
This is defined as a code-build project.  The project pulls from github (default master) and deploys to production s3 bucket.  The needs to be triggered manually either via the console or cli.

**Account**: prod  
**Branch**: master  
**URL**: https://portal.worbli.io  

**Build project**: portal-ui-stage  
**S3 Bucket**: portal-worbli-io

