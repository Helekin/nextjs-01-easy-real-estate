## About The Project

This project is a comprehensive exercise corresponding to Brad Traversy's Udemy course, "Next.js From Scratch 2024" (last updated in September 2024). It serves as an real state platform developed using Next.js.

- [Udemy Instructor](https://www.udemy.com/user/brad-traversy/)
- [Udemy Course](https://www.udemy.com/course/nextjs-from-scratch/)

## Getting Started

### Prerequisites

- To get started, make sure you have any code editor installed.

### Installation

1. Clone the repository to your local machine:

```sh
git clone https://github.com/Helekin/nextjs-01-easy-real-estate.git
```

2. Rename the `.env.example` file to `.env` and add the following

```sh
MONGODB_URI="your_mongodb_uri"
NEXT_PUBLIC_DOMAIN="http://localhost:3000"
NEXT_PUBLIC_API_DOMAIN="http://localhost:3000/api"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_URL_INTERNAL="http://localhost:3000"
NEXTAUTH_SECRET="your_next_auth_secret"
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
AWS_S3_ACCESS_KEY="your_aws_s3_access_key"
AWS_S3_SECRET_ACCESS_KEY="your_aws_s3_secret_access_key"
AWS_S3_BUCKET="your_aws_s3_bucket"
AWS_S3_REGION="your_aws_region"
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN="your_mapbox_access_token"
```

3. Install dependencies

```sh
npm install
```

4. Runs the app in the development mode

```sh
npm run dev
```

## Bug Fixes, corrections and code FAQ

This project might feature alterations compared to the initial course code, including modifications in file names, functions, or variables.

### Project Restructuring

The code has undergone important changes as it now uses different tools compared to the original project. In this version, the login and signup process has been enhanced by adding credentials authentication using `NextAuth`, allowing two ways to create users. Additionally, the use of `Cloudinary` has been replaced with `AWS S3` for storing images, due to AWS being more widely known and preferred by the creator of this repository. Furthermore, Mapbox Geocoding has been implemented for location services, avoiding the need to use Google APIs for maps.

The changes can be viewed at:

> Using credentials
>
> - [app/auth/login/page.jsx](https://github.com/Helekin/nextjs-01-easy-real-estate/tree/main/app/auth/login/page.jsx)
> - [app/auth/register/page.jsx](https://github.com/Helekin/nextjs-01-easy-real-estate/tree/main/app/auth/register/page.jsx)
> - [app/actions/addUser.js](https://github.com/Helekin/nextjs-01-easy-real-estate/tree/main/app/actions/addUser.js)
> - [utils/authOptions.js](https://github.com/Helekin/nextjs-01-easy-real-estate/tree/main/utils/authOptions.js)
>
> AWS S3
>
> - [app/actions/addProperty.js](https://github.com/Helekin/nextjs-01-easy-real-estate/tree/main/app/actions/addProperty.js)

Another noteworthy change is that the `User` document created for MongoDB now includes a password field, but it is only used for users who register via credentials.

## License

Distributed under the MIT License.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Contact

Github: [https://github.com/Helekin](https://github.com/Helekin)
