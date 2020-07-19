import React from "react";



function InformativeMainPaneComponent (props) {
    const { userEntity } = props;

    return (
        <div className="main-pane">
            <div className="informative-main-pane-header">
            <p>Bienvenido {userEntity.username}</p>
            </div>
            <div className="informative-main-pane-message">
                <p>Esta aplicación web está destinada a la visualización de una manera sencilla de la información que podemos obtener de la medición de ondas a través de la electromiografía.</p>
                <p>Gracias a esta página podrás entender qué está sucediendo en tus células neuromuscualres mientras realizas ejercicio. Si aún no tienes datos, ¡expórtalos desde la pestaña de <span className="bold">Datos</span>!</p>
            </div>
        </div>
    )

}
export default InformativeMainPaneComponent;
