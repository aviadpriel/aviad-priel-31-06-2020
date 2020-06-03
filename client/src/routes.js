import  React from "react";

const ComposeEmail = React.lazy(() => import('./components/Pages/ComposeEmail/index'));
const MangeEmail = React.lazy(() => import('./components/Pages/MangeEmail/index'));


const routes = [
    { path: '/mange', exact: true, name: 'Mange Email', component: MangeEmail },

    { path: '/', exact: true, name: 'Compose Email', component: ComposeEmail },

];
export default routes;