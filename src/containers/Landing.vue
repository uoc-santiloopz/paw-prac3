<template>
    <div class='container'>
        <div class='row'>
          <div class='col-xs-12'>
            <h1>Listado de reservas</h1>
          </div>
        </div>
        <div class='row' v-if="reservationsNext24 && reservationsNext24.length">
          <div class='col-xs-12'>
            <a>Próximas 24 horas</a>
          </div>
        </div>
        <div class='row' id='reservationsTableContainer'>
          <div class='col-xs-12'>
            <h3 v-if="!reservations || !reservations.length">No hay reservas que mostrar</h3>
            <ReservationList v-else :reservations="reservations"/>
          </div>
        </div>
        <div class='row'>
          <div class='col-xs-12'>
            <router-link to="/create">
                <button class='btn btn-primary'>Crear reserva</button>
            </router-link>
          </div>
        </div>
    </div>
</template>
<script>
import * as axios from 'axios';
import ReservationList from '@/components/ReservationList.vue'
import { API_ENDPOINTS } from '../shared/network/endpoints';
import { ReservationModel } from '../models/reservation.model';

export default {
    name: 'Landing',
    data() {
        return {
            reservations: null,
            reservationsNext24: null,
            interval: null,
        }
    },
    components: {
        ReservationList
    },
    methods: {
        fetchReservations() {
            axios
                .get([process.env.VUE_APP_API_BASE_URL, API_ENDPOINTS.RESERVATIONS_ALL].join(''))
                .then(res => this.reservations =
                    res.data && res.data.length ? res.data.map(res => new ReservationModel(res)) : []
                );
        },
        fetchReservations24() {
            axios
                .get([process.env.VUE_APP_API_BASE_URL, API_ENDPOINTS.RESERVATIONS_24].join(''))
                .then(res => this.reservationsNext24 =
                    res.data && res.data.length ? res.data.map(res => new ReservationModel(res)) : []
                );
        }
    },
    created() {
        this.interval = setInterval(() => {
            this.fetchReservations24();
        }, 60000);
        this.fetchReservations24();
        this.fetchReservations();
    },
    beforeDestroy() {
        clearInterval(this.interval);
    }
}
</script>
