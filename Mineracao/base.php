<?php

$txt = "";
$quantidades = array();
$qtd = array(
    "p1"=>0,
    "p2"=>0,
    "p3"=>0,
    "p4"=>0
);
for ($x = 0; $x<=23;$x++){
    $quantidades[] = $qtd;
}
for ($x=0;$x<1000;$x++){
    $so = ";linux;";
    if (rand(1,2)==1){
        $so = ";windows;";
    }
    $aux = rand(1,4);
    
    $pagina = "Página ".$aux.";";
    switch(rand(1,4)){
        case 1:
            $navegador = "chrome";
            break;
        case 2:
            $navegador = "opera";
            break;
        case 3:
            $navegador = "edge";
            break;
        case 4:
            $navegador = "mozila";
            break;                    
    }
    $aux2 = rand(0,23);
    $txt .= ";".$aux2. $so . $pagina . $navegador . "<br>";
    $quantidades[$aux2]['p'.$aux]++;
}
echo $txt;
$vet = [];
for ($x=0;$x<=23;$x++){
    $qt = substr_count($txt, ";$x;");
    $vet[] = $qt;
    echo "Acessos Às $x horas:" . $qt . "<br>";
}

$qtw = substr_count($txt, "windows");
$qtl = substr_count($txt, "linux");

echo "<br><h2>Linux: $qtl <br> Windows: $qtw <h2><br>";


$qtc = substr_count($txt, "chrome");
$qto = substr_count($txt, "opera");

$qte = substr_count($txt, "edge");
$qtm = substr_count($txt, "mozila");

echo "<br><h2>Chrome: $qtc <br> Ópera: $qto <br> Edge: $qte <br> Mozila: $qtm <h2><br>";

$qtp1 = substr_count($txt, "Página 1");
$qtp2 = substr_count($txt, "Página 2");

$qtp3 = substr_count($txt, "Página 3");
$qtp4 = substr_count($txt, "Página 4");

echo "<br><h2>P1: $qtp1 <br> P2: $qtp2 <br> P3: $qtp3 <br> P4: $qtp4 <h2><br>";




/**
 * Devemos extrair primeiro a quantidade total de acessos por hora
 */
echo "Hora;Página 1;Página 2;Página 3;Página 4;<br>";
for ($x=0;$x<=23;$x++){
    echo $x.";". $quantidades[$x]['p1'] .";"  . $quantidades[$x]['p2'] .";" . 
    $quantidades[$x]['p3'] . ";" . $quantidades[$x]['p4'] ."<br>";
}


























