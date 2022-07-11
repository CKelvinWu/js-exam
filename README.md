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



### Prerequisite
1. Node.js version <=12.0
Install nvm to install a specific version of node (Install [nvm](https://github.com/nvm-sh/nvm))
If you use nvm to install the node.js you can type `nvm install version` i.g `nvm insall 11.0.0` 

2.  Make sure you have the AWS creditial with `access_key` and `key_id`. 
	It can be found in IAM->Users->Amplify->Security credentials->Create access key( if it's in gray, please ask your manager to delete someone's key  and press create access id ). You will find the `access_key` and `key_id` in a csv file 

![Screen Shot 2022-07-11 at 10 57 27 AM](https://user-images.githubusercontent.com/56998170/178196138-66a0cfa5-0c87-493c-bfb6-85dc925f5b82.png)

3. You can also ask your team member whether they have the credential info, usally stored as an `.aws` folder, so you do not need to click the Create Access Key, keep the access_key and key_id secretly.  
4. Please confirm you have setup the SSH, guide :https://docs.github.com/en/authentication/connecting-to-github-with-ssh




## Installing
1. After clone to your local host,open terminal and type `nvm use ver.number ` ig `nvm use 11.0.0`, as long as the node version is under 12.0. 
2. run `npm install`
3. If you haven't use use aws before run `npm install aws` 

# Amplify Setup

### Step 1. Install Amplify-cli

1. Run the command `npm i -g @aws-amplify/cli@4.13.1`  if not working please install amplify cli updated by `npm i -g @aws-amplify/cli` 

2. Run the command `amplify` and make sure it will show usage information
![Screen Shot 2022-07-11 at 11 07 28 AM](https://user-images.githubusercontent.com/56998170/178195305-b7fc1c35-5004-4c51-981b-aea4bc357844.png)

### Step 2. Setup Local Config

**Amplify will scan your user directory and check `.aws` folder for authentication.**

1. If you have the `.aws` folder, put whole folder into user directory (`echo $HOME` will display actual path)
2. If you and your teamates does not have the .aws folder in your user directory, then run `aws configure`
it will require your `key_id` and `access_key` and make an `.aws` folder with credential info stored in your user directory. 
![Screen Shot 2022-07-11 at 11 10 04 AM](https://user-images.githubusercontent.com/56998170/178195340-afda586f-43ed-45db-b862-bfc970a0ebfe.png)


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
1. Go to the amplify -> CloudFormation->delete all the Stacks with status: "UPDATED Failed" ![Screen Shot 2022-07-11 at 11 26 04 AM](https://user-images.githubusercontent.com/56998170/178195419-0ee18af3-f908-42c7-b35e-45d11a0362b2.png)


2. Then redo the `amplify init` 
3. your `app_id` in `team-provider-info.json` shoud be updated with  with the Amplify Studio app_id(can be found in amplify->edit_backend)
![Screen Shot 2022-07-11 at 11 37 33 AM](https://user-images.githubusercontent.com/56998170/178195560-eb265ffd-3918-490b-a739-9145fd083a47.png)

4. After you finish all the setup you can run `npm start` to see if the app working on localhost

### Step 4 - Deployment
1. After the amplify init is finished, type  `npm build` 
2. then type  `npm deploy`
NOTICE: if the `npm deploy` has fatal: remote hang up error , try it in other network environment (i.g personal hotspot)


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
