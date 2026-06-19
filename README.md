[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/qsnPcA12)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=23828349&assignment_repo_type=AssignmentRepo)
# PAI práctica 14: Trapezoidal Rule Calculator
In this project, we will implement a Trapezoidal Rule Calculator using the Model-View-Controller (MVC) design pattern. The application will allow users to input a mathematical function, specify the interval and the number of trapezoids, and then calculate the approximate area under the curve using the trapezoidal rule.
## Classes and functions
The project is organized into the following classes and functions:
- `TrapezoidModel`: This class manages the data and logic of the application, including the number of trapezoids, start and end points, and the function to be integrated.
- `TrapezoidView`: This class manages the DOM elements that display the calculator state.
- `TrapezoidController`: This class manages the interactions between the model and the view, handling user input and updating the view accordingly.
- `AxisHandler`: This class is responsible for drawing the coordinate system and the trapezoids on the canvas.
- `FunctionPoint`: This class represents a point on the function graph, with x and y coordinates.


The project initial directory organization is as follows:
```
.
├── LICENSE
├── README.md
├── dist
│   ├── assets
│   │   ├── my-ULL-bulma-project-Tg3448TN.css
│   │   └── trapezoidal-BH-W6PQ1.js
│   ├── img
│   │   └── uml.png
│   ├── index.html
│   └── src
│       └── exercises
│           └── home-work
│               ├── public
│               │   └── trapezoidal.html
│               └── uml
│                   └── uml.html
├── index.html
├── jest.config.cjs
├── p14_MVC-TrapezoidalRuleCalculator.md
├── package-lock.json
├── package.json
├── public
│   └── img
│       └── uml.png
├── src
│   ├── exercises
│   │   └── home-work
│   │       ├── controller
│   │       │   └── trapezoid_controller.ts
│   │       ├── doc
│   │       ├── img
│   │       ├── main.ts
│   │       ├── model
│   │       │   ├── function_point.ts
│   │       │   ├── trapezoid_model.test.ts
│   │       │   └── trapezoid_model.ts
│   │       ├── public
│   │       │   └── trapezoidal.html
│   │       ├── uml
│   │       │   └── uml.html
│   │       └── view
│   │           ├── axis_drawer.ts
│   │           ├── coordinate_system.ts
│   │           └── trapezoid_view.ts
│   └── index.ts
├── styles
│   └── my-ULL-bulma-project.css
├── tsconfig.json
└── vite.config.ts
```
## Building the project
* npm install
* npm run build
* cd dist
* npx vite

