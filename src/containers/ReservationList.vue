<template>
    <div class='container'>
        <div class='row'>
          <div class='col-xs-12'>
            <h1>Listado de reservas {{ isNext24View ? 'en las próximas 24 horas'  :'' }}</h1>
          </div>
        </div>
        <div class="row" v-if="isNext24View">
            <div class="col-xs-12">
                <router-link to="/">
                    <button class="btn btn-primary">Volver</button>
                </router-link>
            </div>
        </div>
        <div class='row' v-else-if="reservationsNext24 && reservationsNext24.length">
            <div class='col-xs-12'>
                <router-link to="/next24">
                    <a>Próximas 24 horas</a>
                </router-link>
            </div>
        </div>
        <div class='row' id='reservationsTableContainer'>
          <div class='col-xs-12'>
            <h3 v-if="!areReservationsAvailable()">No hay reservas que mostrar</h3>
            <ReservationsTable
                    v-else :reservations="isNext24View ? reservationsNext24 : reservations"
            />
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
import axios from 'axios';
import ReservationsTable from '@/components/ReservationsTable.vue'
import { API_ENDPOINTS } from '../shared/network/endpoints';
import { ReservationModel } from '../models/reservation.model';

export default {
    name: 'ReservationList',
    data() {
        return {
            reservations: null,
            reservationsNext24: null,
            interval: null,
            isNext24View: null
        }
    },
    components: {
        ReservationsTable
    },
    methods: {
        fetchReservations() {
            axios
                .get([process.env.VUE_APP_API_BASE_URL, API_ENDPOINTS.RESERVATIONS_ALL].join(''))
                .catch(err => window.console.log(err))
                .then(res => this.reservations =
                    res.data && res.data.length ? res.data.map(res => new ReservationModel(res)) : []
                );
        },
        fetchReservations24() {
            axios
                .get([process.env.VUE_APP_API_BASE_URL, API_ENDPOINTS.RESERVATIONS_24].join(''))
                .catch(err => window.console.log(err))
                .then(res => this.reservationsNext24 =
                    res.data && res.data.length ? res.data.map(res => new ReservationModel(res)) : []
                );
        },
        isNavigatingTo24View(urlName) {
            return urlName.includes('24');
        },
        areReservationsAvailable() {
          return this.isNext24View ?
              (this.reservationsNext24 && this.reservationsNext24.length) :
              (this.reservations && this.reservations.length)
        },
    },
    created() {
        this.isNext24View = this.isNavigatingTo24View(this.$route.name);
        this.interval = setInterval(() => {
            this.fetchReservations24();
        }, 60000);
        this.fetchReservations24();
        this.fetchReservations();
    },
    beforeDestroy() {
        clearInterval(this.interval);
    },
    watch: {
        $route (to) {
            this.isNext24View = this.isNavigatingTo24View(to.name);
        }
    }
}
</script>
