<a name="readme-top"></a>
<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]


<!-- PROJECT LOGO -->
<br />
<div align="center">

  <h3 align="center">E-Commerce Restful API Backend</h3>

  <p align="center">
    Backed for an e-commerce website that uses PostgreSQL, Express, and Node.js.
    <br />
    <!-- <a href="#">View Live</a>  -->
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
        <li><a href="#app-layout">App Layout</a></li>
        <li><a href="#screenshots">Screenshots</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
Node/Express REST API to provide typical functionality found in an ecommerce website. Users can create accounts, view products, add products to a cart, and place/view orders.

### Built With
[![PostgreSQL][postgresql]][postgresql-url]
[![Express][Express.js]][Express-url]
[![Node][Node.js]][Node-url]
[![JavaScript][JavaScript]][JavaScript-url]
[![Swagger][swagger]][swagger-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>

### API Documentation

[![Entity Relational Diagram][ERD]]()

Once the app is running locally, you can access the Swagger documentation at `http://localhost:<your-port>/docs`

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- RUNNING THE PROJECT -->
## Running the app
To run locally, `npm install`, then `nodemon server`

This project requires a [PostgreSQL](https://www.postgresql.org/) database to be running locally.  Reference the ERD diagram located in the `resources` folder of this repo to view the structure of the tables. 

This repo includes an `example.env` file that contains important environment variables for reference.  Make sure to create a `.env` file and include all variables found in the `example.env` file, replacing the example values with those specific to your environment/needs.

Once the app is running locally, you can access the API at `http://localhost:<your-port>`


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Patrick Alvarez Eades - p.alvarezeades@gmail.com

Project Link: [https://github.com/Patchalv/Ecomm-Restful-API-backend](https://github.com/Patchalv/Ecomm-Restful-API-backend)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

https://github.com/Patchalv/Ecomm-Restful-API-backend
[contributors-shield]: https://img.shields.io/github/contributors/Patchalv/Ecomm-Restful-API-backend.svg?style=for-the-badge
[contributors-url]: https://github.com/Patchalv/Ecomm-Restful-API-backend/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Patchalv/Ecomm-Restful-API-backend.svg?style=for-the-badge
[forks-url]: https://github.com/Patchalv/Ecomm-Restful-API-backend/network/members
[stars-shield]: https://img.shields.io/github/stars/Patchalv/Ecomm-Restful-API-backend.svg?style=for-the-badge
[stars-url]: https://github.com/Patchalv/Ecomm-Restful-API-backend/stargazers
[issues-shield]: https://img.shields.io/github/issues/Patchalv/Ecomm-Restful-API-backend.svg?style=for-the-badge
[issues-url]: https://github.com/Patchalv/Ecomm-Restful-API-backend/issues
[license-shield]: https://img.shields.io/github/license/Patchalv/Ecomm-Restful-API-backend?label=license&style=for-the-badge
[license-url]: https://github.com/Patchalv/Ecomm-Restful-API-backend/blob/master/LICENSE.md
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/patrickalvarezeades/

[ERD]: ./server/resources/ERD.png

[swagger]: https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white
[swagger-url]: https://swagger.io/
[postgresql]: https://img.shields.io/badge/postgresql-4169e1?style=for-the-badge&logo=nextdotjs&logoColor=white
[postgresql-url]: https://www.postgresql.org/
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Redux.js]: https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white
[Redux-url]: https://redux.js.org/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://react-bootstrap.netlify.app/
[Express.js]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[Express-url]: https://expressjs.com/
[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/
[HTML]: https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white
[HTML-url]: #
[CSS]: https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white
[CSS-url]: #
[JavaScript]: https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E
[JavaScript-url]: #
