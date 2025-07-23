<script setup lang="ts">
import TheTopic from '@/components/TheTopic.vue';
import Table from '@/components/ReusableTable.vue';
import Script from '@/components/ExpandableScript.vue';
import SplitShowcase from '@/components/SplitShowcase.vue';
import List from '@/components/ReusableList.vue';
import TheModal from '@/components/TheModal.vue';
import { ref } from 'vue';

const modalVisible = ref(false);
const modalMessage = ref('');

function showAlert(event: any, text: string) {
  modalMessage.value = text;
  modalVisible.value = true;

  console.log('Event Object:', event);
  console.log('Event Target:', event.target);
  console.log('Event Type:', event.type);
}

function toggleDone(event: Event) {
  const target = event.target as HTMLElement;
  if (target.tagName === 'LI') {
    target.classList.toggle('done');
  }

  showAlert(event, `Tıklanan Element: ${ target.innerText }`)
}

const eventFlow = [
  'target → Olayı tetikleyen element',
  'type → Olayın türü (örneğin "click")',
  'preventDefault() → Varsayılan davranışı engeller',
  'stopPropagation() → Olayın yayılmasını durdurur',
  'key, clientX, ctrlKey, timeStamp gibi onlarca özellik daha'
];

const buttonCode = `document.querySelector('.click-button').addEventListener('click', function (event) {
  console.log(event.target); // Tıklanan buton
  console.log(event.type);   // "click"
});`

const delegationFlow = [
  'Performans: Çok sayıda öğeye ayrı ayrı event listener tanımlamak yerine tek bir listener yeterlidir.',
  'Dinamik öğeler: Sonradan eklenen öğeler de otomatik olarak yönetilebilir.',
  'DOM sade kalır.'
]

const changeCode = `document.querySelector('.change-select').addEventListener('change', function (event) {
  alert(event.value);
});`

const ulCode = `document.getElementById('todo-list').addEventListener('click', function (event) {
  if (event.target.tagName === 'LI') {
    event.target.classList.toggle('done');
  }
});`

const extras = [
  ["event.stopPropagation()", "Olayın parent elementlere iletilmesini engeller"],
  ["event.preventDefault()", "	Varsayılan davranışı iptal eder (örneğin linke gitmeyi)"],
  ["event.currentTarget	", "	Dinleyici tanımlı olan element"],
  ["event.target", "	Olayı gerçekten tetikleyen element"],
]

function parentClicked(event: any) {
  console.log('Parent div tıklandı!')
  //showAlert(event, 'Parent div tıklandı!');
}

function childClicked(event: any) {
  console.log('Child butona tıklandı!')
  //showAlert(event, 'Child butona tıklandı!');
}

function childClickedWithPropagation(event: any) {
  event.stopPropagation();
  console.log('Child butona tıklandı!')
  //showAlert(event, 'Child butona tıklandı!');
}

const propagationCode = `
document.getElementById('parent-1').addEventListener('click', function () {
    alert('Parent div tıklandı!');
});

document.getElementById('child-1').addEventListener('click', function (event) {
    event.stopPropagation(); // Parent'a tırmanmasını engeller
    alert('Child butona tıklandı!');
});`

const propagationCode2 = `
document.getElementById('parent-2').addEventListener('click', function () {
    alert('Parent div tıklandı!');
});

document.getElementById('child-2').addEventListener('click', function (event) {
    alert('Child butona tıklandı!');
});`

function handleAClickWithPrevent(event: any) {
  event.preventDefault();
  showAlert(event, 'Link tıklandı ama yönlenme engellendi!');
}

function handleAClick(event: any) {
  showAlert(event, 'Yönlendirme...');
}

const preventCode = `
document.getElementById('a-1').addEventListener('click', function (event) {
    event.preventDefault();
    alert('Link tıklandı ama yönlenme engellendi!');
});`

const preventCode2 = `
document.getElementById('a-2').addEventListener('click', function () {
    alert('Yönlendirme');
});`

const summary = [
  'event → Olay hakkında tüm bilgiyi barındıran nesne',
  'event delegation → Parent üzerinden child event’leri yönetme tekniği',
  'Bu teknik, performans, temizlik ve dinamiklik sağlar',
]
</script>

<template>
  <div class="step-three">
    <TheModal :visible="modalVisible" :message="modalMessage" @close="modalVisible = false" />
    <TheTopic title="Event Object Nedir?" :msg="'Tarayıcıda bir event gerçekleştiğinde, o olayla ilgili tüm bilgileri içeren özel bir nesne otomatik olarak oluşturulur: event.'" />
    <br>
    <TheTopic title="İçinde ne var?"/>
    <List :items="eventFlow" />
    <br>
    <TheTopic title="Anlatım İpucu:" :msg="'Bir olay meydana geldiğinde tarayıcı, o olayın ayrıntılarını paketleyip geliştiriciye teslim eder. Bu paketin adı event nesnesidir.'"/>
    <br>
    <TheTopic title="Örnek:" />
    <Script title="Click Event">
      {{ buttonCode }}
    </Script>
    <br>
    <SplitShowcase>
      <template #ui>
        <button @click="showAlert($event, 'Console\'u kontrol edin')" class="click-button" style=" width: 150px; padding: 5px; margin: 0 auto;">Button</button>
      </template>
    </SplitShowcase>
    <br>
    <div class="divider"></div>
    <br>
    <TheTopic title="Event Delegation Nedir?" :msg="'Olayları, birden fazla küçük elemana ayrı ayrı dinleyici (listener) eklemek yerine, bu öğelerin ortak atasına tek bir listener ekleyerek yönetme tekniğidir.'" />
    <br>
    <TheTopic title="Neden kullanılır?"/>
    <List :items="delegationFlow" />
    <br>
    <TheTopic title="Anlatım İpucu:" :msg="'Yüzlerce çocuğun olduğu bir sınıfta öğretmen her çocukla tek tek ilgilenmek yerine, sınıfı dinleyerek kimin ne yaptığını gözlemler ve sadece ihtiyacı olanla ilgilenir.'"/>
    <br>
    <TheTopic title="Örnek:" />
    <Script title="Event Delegation Change Örneği">
      {{ changeCode }}
    </Script>
    <br>
    <SplitShowcase>
      <template #ui>
        <select
          @change="showAlert($event, `Güncel Değer: ${ ($event.target as HTMLSelectElement).value }`)"
          class="change-select"
          style=" width: 150px; padding: 5px; margin: 0 auto;"
        >
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
        </select>
      </template>
      <template #command>
        <div>Seçenek değiştirin</div>
      </template>
    </SplitShowcase>
    <br>
    <Script title="Event Delegation Click Örneği">
      {{ ulCode }}
    </Script>
    <br>
    <SplitShowcase>
      <template #ui>
        <ul @click="toggleDone($event)" id="todo-list">
          <li>Görev 1</li>
          <li>Görev 2</li>
          <li>Görev 3</li>
        </ul>
      </template>
      <template #command>
        <div>Herhangi bir li elementine tıklayın</div>
      </template>
    </SplitShowcase>
    <br>
    <TheTopic title="Ekstra Bilgiler:" />
    <Table :headers="['Özellik', 'Açıklama']" :rows="extras" />
    <br>
    <TheTopic title="event.stopPropagation()" />
    <Script title="event.stopPropagation olan örnek:">
      {{ propagationCode }}
    </Script>
    <SplitShowcase>
      <template #ui>
        <div id="parent-1" @click="parentClicked" style="padding: 20px; background: #000;">
          <button id="child-1" @click="childClickedWithPropagation" style=" width: 150px; padding: 5px; margin: 0 auto;">
            Button
          </button>
        </div>
      </template>
      <template #command>
        <div>Parent Div (Tıkla) ve Child Button (Tıkla)</div>
      </template>
    </SplitShowcase>
    <Script title="event.stopPropagation olmayan örnek:">
      {{ propagationCode2 }}
    </Script>
    <SplitShowcase>
      <template #ui>
        <div id="parent-2" @click="parentClicked" style="padding: 20px; background: #000;">
          <button id="child-2" @click="childClicked" style=" width: 150px; padding: 5px; margin: 0 auto;">
            Button
          </button>
        </div>
      </template>
      <template #command>
        <div>Parent Div (Tıkla) ve Child Button (Tıkla)</div>
      </template>
    </SplitShowcase>
    <br>
    <TheTopic title="event.preventDefault()" />
    <Script title="event.preventDefault olan örnek:">
      {{ preventCode }}
    </Script>
    <SplitShowcase>
      <template #ui>
        <a href="https://www.google.com" id="a-1" @click="handleAClickWithPrevent" style="padding: 20px; background: #000;">Google</a>
      </template>
      <template #command>
        <div>Yönlendirme'ye tıkla</div>
      </template>
    </SplitShowcase>
    <Script title="event.preventDefault olmayan örnek:">
      {{ preventCode2 }}
    </Script>
    <SplitShowcase>
      <template #ui>
        <a href="https://www.google.com" id="a-2" @click="handleAClick" style="padding: 20px; background: #000;">Google</a>
      </template>
      <template #command>
        <div>Yönlendirme'ye tıkla</div>
      </template>
    </SplitShowcase>
    <br>
    <div class="divider"></div>
    <br>
    <TheTopic title="Özet:" />
    <List :items="summary" />
  </div>
</template>

<style>
.step-three {
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 100%;
}

.divider {
  width: 100%;
  border: 2px solid #fff;
}

.done {
  color: red;
}

@media (min-width: 1024px) {
  .step-three {
    max-height: 75vh;
    display: flex;
    align-items: center;
    overflow: scroll;
  }
}
</style>
