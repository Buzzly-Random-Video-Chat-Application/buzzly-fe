<a id="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![Unlicense License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/nquynqthanq/buzzly-fe">
    <img src="./src/assets/icons/logo.svg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">📌 Buzzly Frontend - Random Video Chat Platform with AI-Powered Interaction</h3>

  <p align="center">
    Buzzly Frontend is the client-side component of a random video chat platform, delivering a seamless and intuitive user interface for global video conversations. Powered by ReactJS and enhanced with AI-driven features, it addresses challenges like language barriers and lack of conversation aids, providing a responsive and engaging experience.
    <br />
    <a href="https://github.com/nquynqthanq/buzzly-fe"><strong>Explore the project »</strong></a>
    <br />
    <br />
    <a href="https://buzzly-fe.vercel.app/">View Demo</a>
    ·
    <a href="https://github.com/nquynqthanq/buzzly-fe/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/nquynqthanq/buzzly-fe/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

[![Buzzly Screenshot][product-screenshot]](https://buzzly-fe.vercel.app/)

Buzzly Frontend is the user interface for a random video chat platform that connects users worldwide through spontaneous video conversations. Built with ReactJS and TypeScript, it provides a responsive, component-based interface powered by Material UI (MUI) and Redux for state management. The frontend integrates with the Buzzly Backend to deliver real-time video chat, AI-driven conversation suggestions, and language translation, addressing challenges like language barriers and poor conversation quality.

**Key Features:**
- Responsive and intuitive UI for seamless video chat experiences.
- Real-time interaction with WebRTC and Socket.io via backend integration.
- AI-powered conversation prompts and translations for enhanced communication.
- Component-based architecture for maintainability and scalability.
- Cross-platform support for desktop and mobile devices.

Developed as part of a capstone project at the University of Information Technology, VNU-HCM, Buzzly Frontend leverages modern web technologies to create an engaging and user-friendly platform.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![React][React.js]][React-url]
- [![TypeScript][TypeScript]][TypeScript-url]
- [![Material-UI][Material-UI]][Material-UI-url]
- [![Redux][Redux]][Redux-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

Follow these steps to set up the Buzzly Frontend locally.

### Prerequisites

- **Node.js** (v16 or higher)
  \`\`\`sh
  npm install npm@latest -g
  \`\`\`
- **Buzzly Backend** (running locally or deployed, e.g., at \`http://localhost:5000\`)

### Installation

1. Clone the repository
   \`\`\`sh
   git clone https://github.com/nquynqthanq/buzzly-fe.git
   \`\`\`
2. Navigate to the project directory
   \`\`\`sh
   cd buzzly-fe
   \`\`\`
3. Install NPM packages
   \`\`\`sh
   npm install
   \`\`\`
4. Create a \`.env\` file in the root directory with:
   \`\`\`env
   REACT_APP_API_URL=http://localhost:5000
   REACT_APP_SOCKET_URL=http://localhost:5000
   \`\`\`
5. Start the development server
   \`\`\`sh
   npm start
   \`\`\`
6. Verify the frontend at \`http://localhost:3000\`.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

Buzzly Frontend provides an intuitive interface for users to engage in random video chats. Examples:

- **User Authentication**: Log in or register via the login/signup forms, which communicate with the backend's \`/api/auth\` endpoints.
- **Video Chat**: Click "Start Chat" to initiate a random video call, powered by WebRTC and Socket.io.
- **AI Suggestions**: View real-time conversation prompts displayed during chats, fetched from the backend's \`/api/ai/suggestions\` endpoint.

For detailed usage instructions, refer to the [Documentation](https://github.com/nquynqthanq/buzzly-fe/wiki).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [x] Responsive UI with ReactJS and MUI
- [x] Real-time video chat integration
- [x] Redux state management
- [ ] Multi-language support for UI
- [ ] Mobile app versions (React Native)
- [ ] Enhanced UI animations and transitions
- [ ] Accessibility improvements (e.g., screen reader support)

See open issues: [https://github.com/nquynqthanq/buzzly-fe/issues](https://github.com/nquynqthanq/buzzly-fe/issues)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are welcome! To contribute:

1. Fork the Project
2. Create a Feature Branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit Changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to Branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the Unlicense License. See \`LICENSE.txt\` for details.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Nguyen Quoc Thang - [https://linkedin.com/in/nquynqthanq](https://linkedin.com/in/nquynqthanq) - nquynqthanq@example.com

Project Link: [https://github.com/nquynqthanq/buzzly-fe](https://github.com/nquynqthanq/buzzly-fe)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

- University of Information Technology, VNU-HCM
- Dr. Do Thi Thanh Tuyen
- [React Documentation](https://reactjs.org/)
- [Material-UI Documentation](https://mui.com/)
- [Redux Documentation](https://redux.js.org/)
- [Choose an Open Source License](https://choosealicense.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/nquynqthanq/buzzly-fe.svg?style=for-the-badge
[contributors-url]: https://github.com/nquynqthanq/buzzly-fe/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/nquynqthanq/buzzly-fe.svg?style=for-the-badge
[forks-url]: https://github.com/nquynqthanq/buzzly-fe/network/members
[stars-shield]: https://img.shields.io/github/stars/nquynqthanq/buzzly-fe.svg?style=for-the-badge
[stars-url]: https://github.com/nquynqthanq/buzzly-fe/stargazers
[issues-shield]: https://img.shields.io/github/issues/nquynqthanq/buzzly-fe.svg?style=for-the-badge
[issues-url]: https://github.com/nquynqthanq/buzzly-fe/issues
[license-shield]: https://img.shields.io/github/license/nquynqthanq/buzzly-fe.svg?style=for-the-badge
[license-url]: https://github.com/nquynqthanq/buzzly-fe/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/nquynqthanq
[product-screenshot]: ./src/assets/images/screenshot.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Material-UI]: https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=mui&logoColor=white
[Material-UI-url]: https://mui.com/
[Redux]: https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white
[Redux-url]: https://redux.js.org/