import React, { Component } from "react";
import PropTypes from 'prop-types';
import Popup from "reactjs-popup";



class LogOutComponent extends Component{
    constructor(props){
        super(props);
    }



    render() {
        const { logOutCallback } = this.props;
        return (
            <Popup className="own-popup" trigger={<button className="nav-main-list-button"> Cerrar Sesión </button>} modal>
            {close => (
            <div>
                <a className="close" onClick={close}>
                &times;
                </a>
                <div className='modal-header'>
                    Cerrar sesión
                </div>
                <div className='modal-message'>
                {" "}
                    ¿Está seguro de que quiere cerrar sesión?
                </div>
                <div className='modal-buttons'>
                    <button
                        className="modal-button"
                        onClick={() => {
                        close();
                        }}
                    >
                        Cancelar
                    </button>
                    <button
                    className="modal-button modal-logout-button"
                    onClick={logOutCallback}>
                        Cerrar sesión
                    </button>
                </div>
            </div>
            )}
        </Popup>
        );
    }
}
export default LogOutComponent;

LogOutComponent.propTypes = {
    logOutCallback: PropTypes.func.isRequired,
}
