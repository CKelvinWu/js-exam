# js-exam readme


A platform for programing interview. Allow interviewer to add/edit exam and dispatch to the Candidate. Inteviewer can also watch the intervewee's coding process. All the coding histories can be viewed in the Candidates page.



## Prerequisites

install `node.js`


## Installing

`npm install`
make sure the aws-exports is in `src` folder

## Usage
### Running the platform

`npm start`

### Format and lint

`npm run format`


### Test

`npm run test`


## Built With

- [Create React App](https://github.com/facebookincubator/create-react-app)
- redux.js
- aws-amplify
- graphql
- Ant design


### Versioning

v0.1.0

---

# Amplify Setup

### Prerequisite
* Node.js version >= 10.x and npm version >= 6.x

### Step 1. Install Amplify-cli

1. Run the command `npm i -g @aws-amplify/cli@4.13.1` (Install [nvm](https://github.com/nvm-sh/nvm) if you have trouble with installing package globally) if not working please install amplify cli updated by npm i -g @aws-amplify/cli

2. Run the command `amplify` and make sure it will show usage information

### Step 2. Setup Local Config

**Amplify will scan your user directory and check `.aws` folder for authentication.**

1. Kindly ask your team member for `.aws` credential info
2. Put whole folder into user directory (`echo $HOME` will display actual path)
3. You can also use `amplify init` to config/setup an .aws credential folder

### Step 3. Init project

1. Go into the project directory `cd /path/to/js-exam`
2. Run the cammand `amplify init` and finish few prompt question as below
	* **? Do you want to use an existing environment?** `Yes`
	* **? Choose the environment you would like to use:** `Prod`
	* **? Choose your default editor:** `(select yours)`
	* **? Do you want to use an AWS profile?** `Yes`
	* **? Please choose the profile you want to use** `amplify-user`
3. If success you'll see the follow message: `Your project has been successfully initialized and connected to the cloud!` :tada::tada::tada:
### Step 3- if init with error:
1. Go to the amplify -> CloudFormation->delete all the Stacks with status: "UPDATED Failed"
2. Then redo the `amplify init`
3. your `team-provider-info.json` shoud be updated with `app_id`
4. If you are a complete new user of Amplify, following guide maybe helpful:

https://aws.amazon.com/tw/blogs/mobile/restoring-aws-amplify-project-after-deleting-it-from-the-cloud/
https://ithelp.ithome.com.tw/articles/10188245
https://travor20814.medium.com/react-%E5%B0%88%E6%A1%88%E6%9E%B6%E6%A7%8B%E5%88%86%E4%BA%AB-%E6%88%91%E7%9A%84%E8%B8%A9%E9%9B%B7%E9%80%B2%E5%8C%96%E9%81%8E%E7%A8%8B-aceea0747045
https://eyesofkids.gitbooks.io/react-basic-zh-tw/content/day27_redux_ex3/ give some concept of redux
https://v5.reactrouter.com/web/guides/quick-start 

### Step 4 - Deployment
1. After the amplify init is finished, type  `npm build` 
2. then type  `npm deploy`
2.1 NOTICE: if the `npm deploy` has fatal: remote hang up error , try it in other network environment (i.g personal hotspot)
