# js-exam readme


A platform for programing interview. Allow interviewer to add/edit exam and dispatch to the Candidate. Inteviewer can also watch the intervewee's coding process. All the coding histories can be viewed in the Candidates page.

### Versioning

v0.1.0

---

## Built With

- [Create React App](https://github.com/facebookincubator/create-react-app)
- redux.js
- aws-amplify
- graphql
- Ant design


## Prerequisites

### Prerequisite
1. * Node.js version <=12.0
Install nvm to install a specific version of node (Install [nvm](https://github.com/nvm-sh/nvm))
If you use nvm to install the node.js you can type `nvm install version` i.g `nvm insall 11.0.0` 

2.  Make sure you have the AWS creditial with accesskey and key_id. 
	It can be found in IAM->Users->amplify->Security credentials->Create access key( if it's in gray, please ask your manager to delete someone's key  and press create a id ). You will find the access_key and key_id in a csv file 
![](2022-07-11-10-57-53.png)
    You can also ask your team member if they have the credential info, usally stored as an `.aws` folder, so you do not need to re-create one, keep the access_key and key_id secretly.  




## Installing
1. After clone to your local host,open terminal and type `nvm use ver.number ` ig `nvm use 11.0.0`, as long as the node version is under 12.0. 
2. run `npm install`
3. If you haven't use use aws before run `npm install aws` 

# Amplify Setup

### Step 1. Install Amplify-cli

1. Run the command `npm i -g @aws-amplify/cli@4.13.1`  if not working please install amplify cli updated by `npm i -g @aws-amplify/cli` 

2. Run the command `amplify` and make sure it will show usage information
![](2022-07-11-11-07-45.png)
### Step 2. Setup Local Config

**Amplify will scan your user directory and check `.aws` folder for authentication.**

1. If you have the `.aws` folder, put whole folder into user directory (`echo $HOME` will display actual path)
2. If you and your teamates does not have the .aws folder in your user directory, then run `aws configure`
it will require your key_id and access_key and make an .aws folder with credential info stored in your user directory. 

![](2022-07-11-11-10-21.png)

### Step 3. Init project

1. Go into the project directory `cd /path/to/js-exam`
2. Run the cammand `amplify init` and finish few prompt question as below
	* **? Do you want to use an existing environment?** `Yes`
	* **? Choose the environment you would like to use:** `dev`
	* **? Choose your default editor:** `(select yours)`
	* **? Do you want to use an AWS profile?** `Yes`
	* **? Please choose the profile you want to use** `amplify-user`
3. If success you'll see the follow message: `Your project has been successfully initialized and connected to the cloud!` :tada::tada::tada:

### Step 3- if init with error:
1. Go to the amplify -> CloudFormation->delete all the Stacks with status: "UPDATED Failed" ![](2022-07-11-11-28-46.png)

2. Then redo the `amplify init` 
3. your `app_id` in `team-provider-info.json` shoud be updated with  with the Amplify Studio app_id(can be found in amplify->edit_backend)
![](2022-07-11-11-39-13.png)
4. After you finish all the setup you can run `npm start` to see if the app working on localhost

### Step 4 - Deployment
1. After the amplify init is finished, type  `npm build` 
2. then type  `npm deploy`
    2.1 NOTICE: if the `npm deploy` has fatal: remote hang up error , try it in other network environment (i.g personal hotspot)


## Usage
### Running the platform


### Format and lint

`npm run format`


### Test

`npm run test`


### Reference 
if you are new user of AWS amplify, some following guide maybe helpful

https://aws.amazon.com/tw/blogs/mobile/restoring-aws-amplify-project-after-deleting-it-from-the-cloud/
https://ithelp.ithome.com.tw/articles/10188245
https://travor20814.medium.com/react-%E5%B0%88%E6%A1%88%E6%9E%B6%E6%A7%8B%E5%88%86%E4%BA%AB-%E6%88%91%E7%9A%84%E8%B8%A9%E9%9B%B7%E9%80%B2%E5%8C%96%E9%81%8E%E7%A8%8B-aceea0747045
https://eyesofkids.gitbooks.io/react-basic-zh-tw/content/day27_redux_ex3/ give some concept of redux
https://v5.reactrouter.com/web/guides/quick-start 
