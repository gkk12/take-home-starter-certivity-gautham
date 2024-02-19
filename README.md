# take-home-starter-certivity-gautham

<a name="readme-top"></a>
<h3 align="center" name="readme-top">Interactive Wikipedia Content Viewer with Comments</h3>

## About The Project

This project is designed to allow users to view the extracted contents from a renowned Wikipedia page - A Tale of Two Cities. The content is extracted from the original Wiki page and parsed to display on the React DOM. Additionally, a user can add/view/edit/delete comments to each content of the page related to a particular content item seamlessly. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Features included in the project

1. Display the extracted wiki page.
2. The component provides an interactive and visually appealing user interface.
3. Users can toggle the visibility of comments associated with a specific content item.
4. Users can add new comments to the content item.
5. Users can edit their own comments, updating the content or the commenter's name.
6. Users can delete their comments to manage the discussion effectively.

### Built With

* Java17 + Spring Boot
* jsoup - Java HTML Parser
* JavaScript
* TypeScript
* React
* react-html-parser
* Material-UI
* Tailwind CSS
* Axios for API communication

## Getting Started

To get a local copy up and running, follow the steps mentioned below.

### Prerequisites

* VSCode / Terminal
* Git Repo
* Java Version Manager: https://sdkman.io/
* Node Version Manager: https://github.com/nvm-sh/nvm
* Docker: https://docs.docker.com/desktop/

### MongoDB

```bash
docker pull mongo
docker run -d --name my-mongodb-container -p 27017:27017 mongo
```

### Java

```bash
sdk list java
sdk install java 17.0.7-tem
sdk use java 17.0.7-tem
sdk default java 17.0.7-tem
```

### NodeJS

```bash
nvm list
nvm install v18.12.1
nvm use v18.12.1
nvm alias default v18.12.1
```

### Installation and running

1. The repository should be cloned to your local computer by executing the following command:
   ```bash
   https://github.com/gkk12/take-home-starter-certivity-gautham.git
   ```
2. Open the cloned project in your favorite IDE, such as VS Code.
3. Running the backend
   ```bash
   cd backend
   ./gradlew build
   ./gradlew bootRun
   ```
4. Running the frontend
   ```bash
   cd frontend
   pnpm install
   npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

Email - gauthamkamathk24@gmail.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>
