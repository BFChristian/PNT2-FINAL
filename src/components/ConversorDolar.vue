<template>
    <h1>Conversor Pesos a Dolares</h1>
    <label for="pesos">Ingrese monto $</label>
    <input id="pesos" v-model="pesos" placeholder="" />

    <p v-if="cotizacionDisponible">
        Valor del dolar oficial venta <strong>${{ dolarOficial }}</strong> - fecha: <em>{{ fecha }}</em>
    </p>

    <p v-if="cotizacionDisponible">
        Valor convertido <strong>USD {{ valorConvertido }}</strong>
    </p>

    <br>
    <p><strong>Respuestas</strong></p>
    <p>
        1:b<br>
        2:b<br>
        3:c<br>
        4:b<br>
        5:c
    </p>
</template>

<script>
import { getDolarOficialVenta } from '../services/dolar';

export default {
    name: 'ConversorDolar',
    data() {
        return {
            pesos: 0,
            dolarOficial: 0,
            valorConvertido: 0,
            fecha: '',
            cotizacionDisponible: false
        };
    },
    methods: {
        async obtenerDolar() {
            try {
                const valor = await getDolarOficialVenta();
                this.dolarOficial = valor;
                this.fecha = new Date().toLocaleString();
                this.cotizacionDisponible = true;
                this.conversorPesosADolares();
            } catch (error) {
               console.log(error);
            }
        },
        conversorPesosADolares() {
            if (this.dolarOficial > 0) {
                this.valorConvertido = (this.pesos / this.dolarOficial).toFixed(2);
            }
        }
    },
    watch: {
        pesos() {
            this.conversorPesosADolares();
        }
    },
    mounted() {
        this.obtenerDolar();
        setInterval(() => {
            this.obtenerDolar();
        }, 2000);
    }
}
</script>

<style scoped></style>
