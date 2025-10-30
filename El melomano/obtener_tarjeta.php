<?php

session_start();

header('Content-Type: application/json');
include_once("melomano.class.php");

$accion = $_GET['accion'] ?? 'nueva_tarjeta'; 

if ($accion == 'nueva_tarjeta') {

    if (!isset($_SESSION['tarjetas_jugadas'])) {
        $_SESSION['tarjetas_jugadas'] = [];
    }

    $tarjeta = Melomano::getNuevaTarjetaBD($_SESSION['tarjetas_jugadas']);

    if (empty($tarjeta)) {
        $_SESSION['tarjetas_jugadas'] = [];
        $tarjeta = Melomano::getNuevaTarjetaBD($_SESSION['tarjetas_jugadas']);
    }

    if (!empty($tarjeta)) {
        $_SESSION['tarjetas_jugadas'][] = $tarjeta->getIdTarjeta();
    }

    
    if (empty($tarjeta)) {
        echo json_encode(['error' => 'No se encontraron tarjetas en la BD']);
    } else {
        $arregloTemp = array();
        $arregloTemp['id_tarjeta'] = $tarjeta->getIdTarjeta();
        $arregloTemp['artista'] = $tarjeta->getArtista();
        $arregloTemp['etapas'] = array();

        foreach ($tarjeta->etapas as $etapa) {
            $arregloTemp['etapas'][] = [
                'tipo' => $etapa->tipo,
                'pregunta' => $etapa->pregunta,
                'respuesta' => $etapa->respuesta,
                'opciones' => $etapa->opciones,
                'respuesta_correcta' => $etapa->respuesta_correcta
            ];
        }
        $myJSON = json_encode($arregloTemp);
        echo $myJSON;
    }

} 
elseif ($accion == 'reiniciar') {

    if (isset($_SESSION['tarjetas_jugadas'])) {
        unset($_SESSION['tarjetas_jugadas']); 
    }
    echo json_encode(['status' => 'sesion reiniciada']);
}

exit();
?>