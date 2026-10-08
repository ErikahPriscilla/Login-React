import React from "react";

import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import MainLayout from "../layout/MainLayout.jsx";

import PessoaForm from "../components/cadastrapessoa/PessoaFormOO.jsx";

import ListaPessoas from "../components/listapessoas/ListaPessoas.jsx";

import VisualizaPessoa from "../components/visualizapessoa/VisualizaPessoa.jsx";

function AppRoutes() {

  return (

    <Routes>

      {/* Rotas dentro do layout principal */}

      <Route
        path="/"
        element={<MainLayout />}
      >

        {/* Rota inicial */}

        <Route
          index
          element={
            <Navigate
              to="cadastrar"
              replace
            />
          }
        />

        {/* Cadastro */}

        <Route
          path="cadastrar"
          element={<PessoaForm />}
        />

        {/* Listagem */}

        <Route
          path="listar"
          element={<ListaPessoas />}
        />

        {/* Visualização */}

        <Route
          path="visualizar/:tipo/:id"
          element={<VisualizaPessoa />}
        />

        {/* Edição */}

        <Route
          path="editar/:tipo/:id"
          element={<PessoaForm />}
        />

      </Route>

    </Routes>

  );

}

export default AppRoutes;