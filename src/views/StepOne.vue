<script setup lang="ts">
import TheTopic from '@/components/TheTopic.vue';
import ReusableList from '@/components/ReusableList.vue';
import ReusableTable from '@/components/ReusableTable.vue';

const headerss = ['Olay Türü', 'Açıklama']
const rowss = [
  ['click', 'Kullanıcının bir butona tıklaması'],
  ['input', 'Bir input alanına yazı girilmesi'],
  ['submit', 'Formun gönderilmesi'],
  ['keydown', 'Klavyeden bir tuşa basılması'],
  ['mouseenter', 'Fareyle bir öğenin üzerine gelme'],
]

const headers = ['Gerçek Dünya', 'Web Dünyası']
const rows = [
  ['Zile basmak', 'Butona tıklamak'],
  ['Musluğu açmak', 'Input\'a yazı yazmak'],
  ['Odanın ışığını açmak	', 'Formun gönderilmesi'],
  ['Bir odaya girmek', 'Sayfaya odaklanmak'],
]



const eventFlow = [
  'Kullanıcı sayfada bir işlem yapar',
  'Tarayıcı bunu bir event olarak algılar',
  'Biz bu event’i dinleyerek (event ReusableListener) bir aksiyon alırız',
]

const importantPoints = [
  'Web sayfaları sadece içerik göstermekle kalmaz, kullanıcının yaptığı şeylere tepki vermek ister.',
  'Tıklamalar, klavyeye basışlar, sayfaya giriş çıkışlar... Bunların hepsi “olay”tır.',
  'Bu olaylara tepki vererek sayfanın davranışını değiştiririz: Örneğin: Bir form gönderildiğinde doğrulama yapmak.'
]

const staticPoints = [
  'Sayfa, sadece gösterilen bir belge değil; kullanıcının yaptıklarına tepki veren bir canlı arayüz haline gelir.',
  'Tıklayan bir kullanıcıya cevap verilir, yazan bir kullanıcı izlenir, bir alanı terk eden kullanıcıya uyarı verilir.',
  'Böylece sayfa, bir uygulama haline gelir.'
]

const examples = [
  'Bir alarm sistemi gibi: Hırsız girerse siren öter.',
  `Event, “biri girdi” bilgisidir.
    Siren ise “event’e verilen tepki”dir.`
]

const developerPoints = [
  'Event kavramı, modern web\'in temelidir.',
  'Formlardan oyunlara, arayüzlerden IoT cihazlarına kadar her yerde vardır.',
  'Interaktif bir sistem kurmak için olayları tanımak, dinlemek ve yönetmek gerekir.'
]

</script>

<template>
  <div class="step-one">
    <TheTopic title="Event (Olay) Nedir?" :msg="'Event, bir sistemde “bir şeyin olması” anlamına gelir.<br> Web dünyasında bu \'bir şey\', çoğu zaman kullanıcı tarafından başlatılan bir etkileşimdir. <br> Tarayıcı tarafında bir event, şu sorunun yanıtıdır:“Şu anda sayfada bir şey oldu mu?”'" />
    <br>
    <TheTopic title="Neden Önemlidir?" />
    <ReusableList :items="importantPoints" />
    <br>
    <TheTopic title="Event'ler ile Sayfa “Statik” olmaktan çıkar" />
    <ReusableList :items="staticPoints" />
    <br>
    <TheTopic title="Kavramsal Düşünce: Event bir “sinyal“ dir" :msg="'Event, sistem içinde “bir şey oldu“ sinyalidir. Bu sinyali dinleyen parçalar, buna tepki verir.'" />
    <ReusableList :items="examples" />
    <br>
    <TheTopic title="Event Akışı"  />
    <ReusableList :items="eventFlow" />
    <br>
    <TheTopic title="Yazılım Geliştirici Neden Bilmelidir?"  />
    <ReusableList :items="developerPoints" />
    <br>
    <TheTopic title="Gerçek Hayattan Event Karşılıkları (Case Düşüncesiyle)"  />
    <ReusableTable :headers="headers" :rows="rows" />
    <br>
  </div>
</template>

<style>
.step-one {
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 100%;
}

@media (min-width: 1024px) {
  .step-one {
    max-height: 75vh;
    display: flex;
    align-items: center;
    overflow: scroll;
  }
}
</style>
