<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <button class="btn btn-primary" @click="goBack()">Volver</button>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <h1>Reserva número {{ $route.query.id }}</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <h3>Nombre</h3>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <h3 class="field_reservation name">{{ $route.query.name }}</h3>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <h3>Apellidos</h3>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <h3 class="field_reservation surnames">{{ $route.query.surnames }}</h3>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <h3>Telefono</h3>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <h3 class="field_reservation phone">{{ $route.query.phone }}</h3>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <h3>Fecha</h3>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <h3 class="field_reservation date">{{ $route.query.date }}</h3>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <h3>Comensales</h3>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <h3 class="field_reservation guests">{{ $route.query.guests }}</h3>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ReservationDetail',
    data() {
        return {

        }
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        }
    },
}
</script>
<style>
    .field_reservation {
        color: #999;
        font-size: 1.5em;
        padding-left: 1em;
    }
</style>