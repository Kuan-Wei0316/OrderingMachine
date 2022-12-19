<?php
require_once "conn.php"


?>
<h1 style="text-align:center">交易明細</h1>
<h5>單號:<?php echo $_POST['r_id'] ?></h5>
<h5>服務編號:<?php echo $_POST['e_id'] ?></h5>
<h5>
    <?php
        $sql = "SELECT create_time FROM receipt WHERE receipt_id='".$_POST['r_id']."';";
        $result = $conn->query($sql);
        if($row = $result->fetch_assoc()) {
            echo $row['create_time'];
        }
    ?>
</h5>
<hr>
<table width="100%" border="0">
    <?php
        $sql= 'SELECT * FROM per_sell INNER JOIN product ON per_sell.product_id=product.product_id WHERE receipt_id="'.$_POST['r_id'].'";';
        $result= $conn->query($sql);
        while($row = $result->fetch_assoc()) {
            echo '<tr>';
            echo '<th>'.$row['product_name'].'</th>';
            echo '<th>'.$row['product_price'].'</th>';
            echo '<th>'.$row['num'].'</th>';
            echo '<th>'.$row['num']*$row['product_price'].'</th>';
            echo '</tr>';
        }
    ?>
</table>
<hr>
<h5>
    共
    <?php
        $sql = "SELECT count(per_sell.receipt_id) FROM receipt INNER JOIN per_sell ON receipt.receipt_id=per_sell.receipt_id WHERE per_sell.receipt_id='".$_POST['r_id']."'";
        $result=$conn->query($sql);
        if($row=$result->fetch_assoc()){
            echo $row['count(per_sell.receipt_id)'];
        }
    ?>
    項
</h5>
<h5>
    <?php
        $sql="SELECT takeout FROM receipt WHERE receipt_id='".$_POST['r_id']."';";
        $result= $conn->query($sql);
        if($row = $result->fetch_assoc()){
            if($row['takeout']==1){
                echo '外帶';
            }else{
                echo '內用';
            }
        }
    ?>
</h5>
<h5>
    總計:
    <?php
        $sql = 'SELECT * FROM per_sell INNER JOIN product ON per_sell.product_id=product.product_id WHERE receipt_id="' . $_POST['r_id'] . '";';
        $result = $conn->query($sql);
        $sum=0;
        while ($row = $result->fetch_assoc()) {
            $sum+=$row['num'] * $row['product_price'];
        }
        echo $sum;
    ?>
</h5>