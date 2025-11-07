<?php
class Melomano {
    
    private $id_tarjeta;
    private $artista;
    public $etapas = []; 

    // Getters
    public function getIdTarjeta() { return $this->id_tarjeta; }
    public function getArtista() { return $this->artista; }
    
    // Setters
    public function setIdTarjeta($val) { $this->id_tarjeta = $val; }
    public function setArtista($val) { $this->artista = $val; }

    public static function getNuevaTarjetaBD($excluir_ids = []) {
        $tarjeta = null;
        
        $con = new mysqli("localhost", "root", "", "melomano_db", "3308"); //yo puse 3308 pq cmabie el puerto
        if ($con->connect_errno) {
            die("Error de conexión: " . $con->connect_error);
        }
        
        $where_clause = "";
        if (count($excluir_ids) > 0) {
            $ids_string = implode(',', array_map('intval', $excluir_ids));
            $where_clause = " WHERE id_tarjeta NOT IN ($ids_string) ";
        }

        $queryTarjeta = "SELECT id_tarjeta, artista FROM tarjeta" . $where_clause . " ORDER BY RAND() LIMIT 1";
        $listadoTarjeta = $con->query($queryTarjeta) or die ("Error al traer tarjeta");
        
        if ($registro_tarjeta = $listadoTarjeta->fetch_object()) {
            $id_tarjeta_seleccionada = $registro_tarjeta->id_tarjeta;

            $queryEtapas = "SELECT * FROM desafio WHERE id_tarjeta = $id_tarjeta_seleccionada ORDER BY orden ASC";
            $listadoEtapas = $con->query($queryEtapas) or die ("Error al traer desafios");

            $tarjeta = new Melomano();
            $tarjeta->setIdTarjeta($registro_tarjeta->id_tarjeta);
            $tarjeta->setArtista($registro_tarjeta->artista);

            while ($registro_etapa = $listadoEtapas->fetch_object()) {
                $tarjeta->etapas[] = $registro_etapa; 
            }
            $listadoEtapas->free();
        }
        
        $listadoTarjeta->free();
        $con->close();
        
        return $tarjeta; 
    }
}
?>