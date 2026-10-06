# Relax map frontend

<img width="934" height="351" alt="image" src="https://github.com/user-attachments/assets/2da95e0c-0e49-4195-b908-f1a7182aec32" />

## Desciption

<p>With our team, we created a beautiful website where you can easily find a location to relax or share your own location with other people on the website. </p>
<p>It can be a cave, river or other types, as well as different regions across all of Ukraine. For easier searching, we added some filters such as region, type, sort by, and a field to search by word or sentence.</p>
<p>You can inspect your new location that you just found by its rating, which comes from real users, feedbacks, and even leave your own feedback, but for these and other cool features, you should log in or register first.</p>
<p>You can create your own page with your favorite locations and share them with your friends or just save them as your memories.</p>

### Tech Stack

| Category             | Technology                              |
| -------------------- | --------------------------------------- |
| Framework            | React + Next.js                         |
| Languages            | Typescript (TSX)                        |
| Forms and Validation | Formik + Yup                            |
| Rest Api requests    | Axios library, Next routing, Next proxy |
| Storage actions      | Zustand                                 |
| CSS                  | CLSX library, modern-normalize          |
| Cash control         | Tanstack Query                          |
| Push notifications   | React hot toast                         |

Others:
` React-use `, `swiper`, `slim-select`, `cookie`, `@vis.gl/react-google-maps `, `spinners-react`, `use-debounce`, `react-dropzone`.

### Project Architecture:
```
/
├──app               # Main core of the program where all pages are 
   ├──auth routes    # Auth routes pages
   ├──private roures # Private routes for logged-in users
   ├──public routes  # For all users, either logged-in or without an account
   ├──api            # Next routing
   ├──others         # Main page, layout, error and loading pages, and so on
├──components        # Frequently used React components
   ├──auth           # For authentication stuff
   ├──forms          # Form components
   ├──providers      # AuthProvider, TanstackProvider
   ├──sections       # Sections across the project
   ├──ui             # Reusable UI elements
   ├──others         # Folders and components that aren`t in any of the categories above
├──lib               # For API clients and stores
   ├──api            # For API clients and API functions
   ├──store          # For stores such as authStore, LocationStore
├──public            # Public photos and icons
├──types             # For types and interfaces used across the project
└──utils             # Reusable or helper functions
```
### Environmental variables

| Name                   | Purpose                                 | Required |
| ---------------------- | --------------------------------------- | -------- |
| `NEXT_PUBLIC_SITE_URL` | For all client-frontend requests        | Yes      |
| `NEXT_PUBLIC_API_URL`  | For all frontend-backend requests       | Yes      |
| `NEXT_PRIVATE_MAP_API` | For working map at location description | No       |

> For environmental variables, use only safe places, such as a "Deploy secret API keys manager". Don`t save or share them in repository.

### Useful link to backend repository:
- [Backend repository](https://github.com/stanislave-droid/relax_map_back)
- [Swagger documentation for Backend](https://app.swaggerhub.com/apis-docs/development-0ab/Relax-map/1.0.0?view=uiDocs)

## Our Team:
 - [Drochak Stanislav - Team Lead FullStack developer](https://www.linkedin.com/in/stanislav-drochak/)
 - [Evgen Guijeen - Scram master FullStack developer](https://github.com/Guijeen)
 - [Hyria Roman - FullStack developer](https://github.com/HyryaRoman)
 - [Ellen - FullStack developer](https://github.com/Ellen-HI)
 - [Roman-Bieloshchuk - FullStack developer](https://github.com/Roman-Bieloshchuk)
 - [Lara Mach - FullStack developer](https://github.com/LaraMach)
 - [oleksandr0681 - FullStack developer](https://github.com/oleksandr0681)
 - [Anastasiia Aghfir - FullStack deveoloper](https://www.linkedin.com/in/anastasiia-aghfir/)
 - [KateB713 - FullStack developer](https://github.com/KateB713)
 - [Lilia Mamutova - FullStack developer](https://github.com/LiliaMamutova)
 - [Olga Dovgal - FullStack developer](https://github.com/OlgaDovgal)

<h1>Show case:</h1>

## Main features:</h2>
- ### Page with many filter features. That page contains all locations.
  <img width="1048" height="669" alt="image" src="https://github.com/user-attachments/assets/8b195605-5f42-4273-b404-410ff0decc3b" />

- ### Login and Register pages.
  <img width="729" height="483" alt="image" src="https://github.com/user-attachments/assets/b769ac1e-d6dc-4d69-8404-38776f9f0d14" />

- ### Location description.
  <img width="454" height="703" alt="image" src="https://github.com/user-attachments/assets/bfc25d9a-e1dd-4551-91e5-a9512ee0cfb3" />

- ### Possibility to add your own location.

- ### Edit existing location.
  <img width="402" height="773" alt="image" src="https://github.com/user-attachments/assets/06e18dfd-2b32-482e-8892-80f2e3f7be30" />

- ### Leave a comment/feedback.
  <img width="576" height="413" alt="image" src="https://github.com/user-attachments/assets/8e680ab7-86c9-4d11-9f59-2a73dac82428" />

