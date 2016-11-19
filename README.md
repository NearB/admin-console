# Near.B Web Admin Console

## Requirements
- [Node.js and npm](https://nodejs.org/en/download/)

## Run the app
```
npm start
```

### Checking if everything worked

Go to :

`localhost:3000`


### Troubleshooting

#### 1. `invariant.js:38 Uncaught Invariant Violation: addComponentAsRefTo(...): Only a ReactOwner can have refs.`

Because of a duplicated React installation, the solutions is:
```
$ rm -rf 'node_modules/material-ui/node_modules/react'
```