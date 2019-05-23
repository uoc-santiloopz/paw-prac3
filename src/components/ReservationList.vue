<template>
  <table class="table">
    <thead>
    <tr scope="col">
      <th></th>
    </tr>
    </thead>
    <tbody>
    <tr id="row">
      <td></td>
    </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ReservationList extends Vue {
  @Prop() private reservations!: string;

  constructor() {
    super();
    console.log(this.reservations);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
