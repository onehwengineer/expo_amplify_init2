## expo_amplify_init2
React Native (Expo) App with authentication flow using AWS Amplify + Cognito. <br>
Custom SignIn, SignUp, ForgotPassword screens. <br>
Homogeneous theme across screens using /styles. <br>
(NOT tested under Android environment).<br>
**NOTE : `git clone` won't work! Follow instructions to set up & run**<br>
<br>
> This app integrates features from **various sources** : <br>
> 1) UI/UX : https://dribbble.com/shots/4569970/attachments/1033490?mode=media
> 2) Plant App video : https://youtu.be/gyiwFcrVRCM
> 3) Plant App source code : https://github.com/react-ui-kit/dribbble2react/tree/master/plant-app
> 4) Custom authentication flow using Context, Hooks and AWS Cognito : https://medium.com/@mike.almpertis/react-navigation-5-0-authentication-flow-using-context-hooks-and-aws-cognito-3f7d50df7921

> **Other References** <br>
> 1) useReducer() hooks API : https://reactjs.org/docs/hooks-reference.html#usereducer <br>
> 2) AWS authentication with Amplify : https://docs.amplify.aws/lib/auth/getting-started/q/platform/js <br>
> 3) Tektuitive Video : Both built-in & custom RN authentication w/ AWS Amplify : https://www.youtube.com/channel/UCKBWovN9JcjEPoO5rCm9eCA/videos <br>
> 4) Tektuitive GitHub : https://github.com/tektuitive/react-native-amplify-tutorial/tree/main/src

## App Screenshots
<p float="left">
  <img src="https://user-images.githubusercontent.com/60368973/105075776-14014880-5a3f-11eb-8b21-15fa545d346b.png" width="200" />
  <img src="https://user-images.githubusercontent.com/60368973/105075799-182d6600-5a3f-11eb-8770-b68fd1459533.png" width="200" /> 
  <img src="https://user-images.githubusercontent.com/60368973/105075808-1bc0ed00-5a3f-11eb-9a41-7b88cf4b262f.png" width="200" />
</p>
<p float="left">
  <img src="https://user-images.githubusercontent.com/60368973/105076032-6b071d80-5a3f-11eb-9a84-c39b0de54416.png" width="200" />
  <img src="https://user-images.githubusercontent.com/60368973/105076051-6e9aa480-5a3f-11eb-897d-746d2723d177.png" width="200" /> 
  <img src="https://user-images.githubusercontent.com/60368973/105076058-70fcfe80-5a3f-11eb-8d10-41363025b439.png" width="200" />
</p>

## Follow instructions to set up & run - `git clone` won't work!

## Prerequisites
- AWS (Amazon Web Services) account (create one here: https://aws.amazon.com/) <br>
- Some experience in creating an Expo project

## [A] Install AWS Amplify CLI
- Open Terminal, and type `npm install -g @aws-amplify/cli`

## [B] Configure Amplify & Create Amplify User
- In Terminal, type `amplify configure` -> This will re-direct you to a browser AWS console <br>
- In broswer, log in to AWS <br>
- Then, come back to Terminal, and press Enter <br>
- Select Region <br>
- Specify the username of the new IAM user. **I**dentity and **A**ccess **M**anagement (IAM) user is an entity that you create in AWS to represent the person or application that uses it to interact with AWS. I will name this user `amplify-auth-user`. Hit Enter, and your browser will open again. <br>
- Make sure to check below settings <br>
![Image](https://user-images.githubusercontent.com/60368973/105079880-e7502f80-5a44-11eb-8f4d-15c48180a44e.png)
![Image](https://user-images.githubusercontent.com/60368973/105079946-fd5df000-5a44-11eb-81f4-f57af4861048.png)
- Below step is optional <br>
![Image](https://user-images.githubusercontent.com/60368973/105080000-11095680-5a45-11eb-9ab0-8ed873102585.png)
- **Download csv file to store Access Key ID, Secret Access Key, Password**
![Image](https://user-images.githubusercontent.com/60368973/105080071-29797100-5a45-11eb-9710-9def600ac737.png)
- Go back to Terminal -> Press Enter to continue <br>
- Paste Access Key ID, Secret Access Key <br>
- Set a profile name (I kept it same as user name, `amplify-auth-user`) <br>
- Our Amplify user has been created! <br>

## [C] Create a New Expo Project
- In Terminal, `cd` into directory where this project will be created <br>
- `expo init expo_amplify_init2` (or whatever you'd like to name your project) <br>
- `cd` into project directory <br>

## [D] Initialize AWS Amplify in RN (Expo) Project
- After `cd` into project -> `amplify init`
- Answer below prompts :
  - Enter a name for the project ❯ `rnawsamplifyinit`
  - Enter a name for the environment ❯ `dev`
  - Choose your default editor: (Use arrow keys) ❯ `Visual Studio Code`
  - Choose the type of app that you're building ❯ `javascript`
  - What javascript framework are you using ❯ `react-native`
  - The rest, just hit Enter
  - Do you want to use an AWS profile? ❯ `Yes`
  - **Please choose the profile you want to use** (Use arrow keys) ❯ `amplify-auth-user` (that we created in [B])

## [E] Add & Configure Authentication in RN (Expo) Project
- In the same Terminal window, type `amplify add auth`
- Answer below prompts :
  - **Do you want to use the default authentication and security configuration?** (Use arrow keys) ❯ `Default configuration`
      - If Social sign in is desired, chose `Social provider...` but more on the later.
  - **How do you want users to be able to sign in?** (Use arrow keys) ❯ `Email`
  - **Do you want to configure advanced settings?** (Use arrow keys) ❯ `No, I am done.`
  - Finally, type `amplify push` to build all your local backend resources and provision it in the cloud

## [F] Install Dependencies
- Open VSCode by typing `code .` in /expo_amplify_init2 -> Open Terminal within VSCode
- Install AWS Amplify library
  - `npm install aws-amplify aws-amplify-react-native @react-native-community/netinfo`
- Install Navigation
  - `expo install @react-navigation/native`
  - `expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view`
- Install Stack Navigator
  - `expo install @react-navigation/stack`

## [G] Copy and Paste App.js, /src, /assets to your project directory

## [H] Run Expo App in Simulator
- In VSCode Terminal, type `expo start`
  - (To run with clear cache, `expo run -c`)
  - (Or if you have yarn installed, `yarn run ios`)

## [I] Manage User Pools
- In browser, sign in to AWS -> search for Cognito -> Click Manage User Pools
- Click on the User Pool Name that starts with `rnawsamplifyinit...`
- From left tab, click on Users and groups -> Registered users are listed here
