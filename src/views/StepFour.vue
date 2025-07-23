<script setup lang="ts">
import TheTopic from '@/components/TheTopic.vue';
import Table from '@/components/ReusableTable.vue';
import Script from '@/components/ExpandableScript.vue';
import SplitShowcase from '@/components/SplitShowcase.vue';
import List from '@/components/ReusableList.vue';
import TheModal from '@/components/TheModal.vue';
import { ref } from 'vue';
import { setTimeout } from 'timers/promises';

const modalVisible = ref(false);
const modalMessage = ref('');
const timeoutId = ref<number | null>(null);

function startTimeout() {
  if (timeoutId.value !== null) {
    clearTimeout(timeoutId.value);
  }
  timeoutId.value = window.setTimeout(() => {
    showAlert('setTimeout tetiklendi!');
    timeoutId.value = null;
  }, 2000);
}

function clearTimeoutHandler() {
  if (timeoutId.value !== null) {
    clearTimeout(timeoutId.value);
    timeoutId.value = null;
  }
}

const list = [
  'Kullanıcıyla etkileşime geçebilir',
  'Zamanlayıcı başlatabilir',
  'Tarayıcıda veri saklayabilir',
  'Ağ üzerinden veri alabilir',
  'Medya oynatabilir vb.'
]

const apis = [
  ['console',	'Konsola log yazmak'],
  ['alert, prompt', 'Kullanıcıya mesaj göstermek'],
  ['setTimeout', 'Belirli süre sonra bir işlem çalıştırmak'],
  ['setInterval',	'Belirli aralıklarla işlem tekrarlamak'],
  ['localStorage',	'Tarayıcıda veri saklamak (kalıcı)'],
  ['sessionStorage',	'Oturum süresince veri saklamak'],
  ['fetch()',	'Sunucudan veri almak (ağ işlemleri)'],
  ['document / window', 'Sayfa üzerindeki öğelere erişmek ve kontrol etmek'],
]

const headers = ['API', 'Açıklama']

const consoleApis = [
  ["console.log()", "Mesajları geliştirici konsoluna yazdırır"],
  ["console.error()", "Hata mesajı olarak loglar"],
  ["console.warn()", "Uyarı mesajı loglar"],
  ["console.table()", "Veriyi tablo halinde yazdırır"]
];

const alertApis = [
  ["alert()", "Basit bilgi kutusu gösterir"],
  ["confirm()", "Evet/Hayır sorusu sorar"],
  ["prompt()", "Kullanıcıdan metin girişi ister"]
];


const timerApis = [
  ["setTimeout()", "Belirli bir süre sonra bir işlem başlatır"],
  ["setInterval()", "Belirli aralıklarla işlemi tekrarlar"],
  ["clearTimeout()", "setTimeout() işlemini iptal eder"],
  ["clearInterval()", "setInterval() işlemini iptal eder"]
];


const storageApis = [
  ["localStorage", "Kalıcı veri saklar (tarayıcı kapansa da kalır)"],
  ["sessionStorage", "Oturum süresince veri saklar"],
  ["setItem(), getItem(), removeItem(), clear()", "CRUD işlemleri"]
];

const jsonApis = [
  ["JSON.stringify()", "Obje/array’i string'e dönüştürür (veri saklamak için)"],
  ["JSON.parse()", "String'i tekrar objeye çevirir"]
];

const networkApis = [
  ["fetch()", "Sunucudan veri çekmek veya veri göndermek"],
  ["XMLHttpRequest", "Eski veri alma yöntemi (hala bazı yerlerde kullanılır)"]
];

const domApis = [
  ["window", "Tarayıcı penceresini temsil eder"],
  ["document", "HTML DOM ağacına erişim sağlar"],
  ["document.querySelector()", "Element seçer"],
  ["addEventListener()", "Olayları dinlemek için kullanılır"]
];

const visibilityApis = [
  ["document.visibilityState", "Sekme görünür mü kontrol eder"],
  ["window.onbeforeunload", "Sayfa kapanmadan önce uyarı verir"],
  ["history.pushState()", "URL değiştirmeden geçmişi yönetir"]
];

const eventApis = [
  ["addEventListener()", "Event listener ekler"],
  ["removeEventListener()", "Listener'ı kaldırır"],
  ["event.preventDefault()", "Varsayılan davranışı engeller"],
  ["event.stopPropagation()", "Event bubbling’i durdurur"]
];

const environmentApis = [
  ["navigator.onLine", "İnternet bağlantısı durumu"],
  ["screen.width", "Ekran genişliği"],
  ["window.innerWidth", "Viewport genişliği"],
  ["location.href", "Sayfa adresi"],
  ["localStorage, sessionStorage", "Tarayıcıda veri saklama"]
];

const consoleCodes = `
document.querySelector('.log-button').addEventListener('click', function (event) {
  console.log('Log triggerlandı.')
});

document.querySelector('.error-button').addEventListener('click', function (event) {
  console.error('Error triggerlandı.')
});

document.querySelector('.warn-button').addEventListener('click', function (event) {
  console.warn('Warn triggerlandı.')
});

document.querySelector('.table-button').addEventListener('click', function (event) {
  console.table(['Item1', 'Item2', 'Item3'])
});`

const alertCodes = `
document.querySelector('.alert-button').addEventListener('click', function (event) {
  alert('Alert triggerlandı.')
});

document.querySelector('.confirm-button').addEventListener('click', function (event) {
  confirm('Confirm triggerlandı.')
});

document.querySelector('.prompt-button').addEventListener('click', function (event) {
  prompt('Prompt triggerlandı.')
});`

const timerCodes = `
let timeoutId;

document.querySelector('.settimeout-btn').addEventListener('click', function () {
  timeoutId = setTimeout(function () {
    alert('setTimeout tetiklendi!');
  }, 2000);
});

document.querySelector('.cleartimeout-btn').addEventListener('click', function () {
  clearTimeout(timeoutId);
});
`;

const intervalCodes = `
let intervalId;

document.querySelector('.setinterval-btn').addEventListener('click', function () {
  let timer = 1;

  intervalId = setInterval(function () {
    console.log('setInterval tetiklendi: ' + timer++');
  }, 1000);
});

document.querySelector('.clearinterval-btn').addEventListener('click', function () {
  clearInterval(intervalId);
});
`;

const intervalId = ref<number | null>(null);
function startInterval() {
  let timer = 1;

  if (intervalId.value !== null) {
    clearInterval(intervalId.value);
  }
  intervalId.value = window.setInterval(() => {
    showAlert(`setInterval tetiklendi: ${ timer++ }`);
  }, 1000);
}
function clearIntervalHandler() {
  if (intervalId.value !== null) {
    clearInterval(intervalId.value);
    intervalId.value = null;
  }
}

const triggerAlert = () => {
  alert("Alert triggerlandı.")
}

const triggerConfirm = () => {
  confirm("Confirm triggerlandı.")
}

const triggerPrompt = () => {
  prompt("Prompt triggerlandı.")
}

function showAlert(text: string) {
  modalMessage.value = text;
  modalVisible.value = true;
}

const localStorageCodes = `
document.getElementById('saveBtn').addEventListener('click', function() {
  const value = document.getElementById('myInput').value;
  localStorage.setItem('myKey', value);
});

document.getElementById('readBtn').addEventListener('click', function() {
  const value = localStorage.getItem('myKey');
  alert('localStorage\'dan okunan: ' + value);
});
`;

const localInput = ref('');
function saveToLocalStorage() {
  localStorage.setItem('myKey', localInput.value);
}
function readFromLocalStorage() {
  const value = localStorage.getItem('myKey');
  showAlert(`localStorage'dan okunan: ${value}`);
}

</script>

<template>
  <div class="step-four">
    <TheModal :visible="modalVisible" :message="modalMessage" @close="modalVisible = false" />
    <TheTopic title="Temel Web API’leri Nedir?" :msg="'Web API’leri, tarayıcının bize sunduğu hazır ve standartlaşmış JavaScript fonksiyonlarıdır. Bu API’ler sayesinde web sayfaları:'" />
    <List :items="list" />
    <br>
    <TheTopic title="API Ne Demek?'" :msg="'API (Application Programming Interface), bir uygulamanın başka bir kod parçasıyla konuşmasını sağlayan arayüzdür.'" />
    <TheTopic :msg="'Tarayıcılar, JavaScript\'e bu tür arayüzler (API\'ler) sağlar ki biz de bu arayüzleri kullanarak gelişmiş işlemler yapabilelim.'" />
    <br>
    <TheTopic title="Temel Web API’lere Örnekler:"/>
    <Table :headers="['API', 'Ne iş yarar']" :rows="apis" />
    <br>
    <TheTopic title="Neden Önemlidir?"/>
    <List :items="['Bu API\'ler sayesinde tarayıcı sadece “bir şey gösteren” değil, kullanıcıyla etkileşim kuran ve dinamik davranan bir ortama dönüşür.', 'Temel API’ler, modern uygulamaların temel yapı taşlarıdır (SPA, PWA, interaktif formlar vb.).']"/>
    <br>
    <TheTopic title="Teknik Olarak Nereden Geliyorlar?"/>
    <List :items="['Bu API’ler JavaScript’in kendisinden değil, tarayıcının (Chrome, Firefox, Safari) sunduğu ortamdan gelir.', 'Yani bunlar **“tarayıcı destekli JavaScript özellikleri”**dir.']"/>
    <br>
    <div class="divider"></div>
    <br>
    <TheTopic title="Temel Web API'leri"/>
    <TheTopic title="Konsol & Geliştirici Araçları" :msg="'Tarayıcıya log yazmak ve debug işlemlerini kolaylaştırmak için kullanılır.'"/>
    <Table :headers="headers" :rows="consoleApis" />
    <br>
    <div class="divider"></div>
    <br>
    <TheTopic title="Kullanıcı Bildirimleri" :msg="'Kullanıcıyla iletişim kurmak için tarayıcı üzerinden açılan popup mesaj kutularıdır.'"/>
    <Table :headers="headers" :rows="alertApis" />
    <br>
    <div class="divider"></div>
    <br>
    <TheTopic title="Zamanlayıcılar" :msg="'Zaman bazlı işlemleri (gecikmeli ya da periyodik) gerçekleştirmek için kullanılır.'"/>
    <Table :headers="headers" :rows="timerApis" />
    <br>
    <div class="divider"></div>
    <br>
    <TheTopic title="Tarayıcı Depolama (Storage API)" :msg="'Kullanıcının tarayıcısında veri saklamayı sağlayan kalıcı ve geçici depolama alanlarıdır.'"/>
    <Table :headers="headers" :rows="storageApis" />
    <br>
    <div class="divider"></div>
    <br>
    <TheTopic title="Veri İşleme (JSON)" :msg="'Veriyi string’e çevirme ve tekrar nesneye dönüştürme işlemleri için kullanılır.'"/>
    <Table :headers="headers" :rows="jsonApis" />
    <br>
    <div class="divider"></div>
    <br>
    <TheTopic title="Ağ (Network) API’leri" :msg="'Sunucudan veri çekmek ya da veri göndermek için kullanılır; web servisleriyle iletişim kurar.'"/>
    <Table :headers="headers" :rows="networkApis" />
    <br>
    <div class="divider"></div>
    <br>
    <TheTopic title="Window ve DOM API’leri" :msg="'Tarayıcı penceresi ve HTML dokümanı ile etkileşim kurmak için kullanılan temel arayüzlerdir.'"/>
    <Table :headers="headers" :rows="domApis" />
    <br>
    <div class="divider"></div>
    <br>
    <TheTopic title="Görünürlük ve Oturum Kontrolü" :msg="'Sekme durumu, sayfa kapanışı gibi olayları kontrol etmek için kullanılır.'"/>
    <Table :headers="headers" :rows="visibilityApis" />
    <br>
    <div class="divider"></div>
    <br>
    <TheTopic title="Etkinlik ve Olay Yönetimi" :msg="'Kullanıcının sayfayla olan etkileşimlerini (click, scroll, input vb.) dinlemek ve yönetmek için kullanılır.'"/>
    <Table :headers="headers" :rows="eventApis" />
    <br>
    <div class="divider"></div>
    <br>
    <TheTopic title="Cihaz & Ortam API’leri" :msg="'Kullanıcının cihazı ve tarayıcı ortamıyla ilgili bilgileri elde etmek için kullanılır.'"/>
    <Table :headers="headers" :rows="environmentApis" />
    <br>
    <div class="divider"></div>
    <br>
    <TheTopic title="Temel WEB API Kullanımları"/>
    <br>
    <TheTopic title="Konsol & Geliştirici Araçları"/>
    <Script title="Console APIs">
      {{ consoleCodes }}
    </Script>
    <br>
    <SplitShowcase>
      <template #ui>
        <button @click="console.log('Log triggerlandı.')" class="log-button" style=" width: 150px; padding: 5px; margin: 0 auto;">Log Button</button>
      </template>
      <template #command>
        <div>Butona basın ve console'u kontrol edin</div>
      </template>
    </SplitShowcase>
    <br>
    <SplitShowcase>
      <template #ui>
        <button @click="console.error('Error triggerlandı.')" class="error-button" style=" width: 150px; padding: 5px; margin: 0 auto;">Error Button</button>
      </template>
      <template #command>
        <div>Butona basın ve console'u kontrol edin</div>
      </template>
    </SplitShowcase>
    <br>
    <SplitShowcase>
      <template #ui>
        <button @click="console.warn('Warn triggerlandı.')" class="warn-button" style=" width: 150px; padding: 5px; margin: 0 auto;">Warn Button</button>
      </template>
      <template #command>
        <div>Butona basın ve console'u kontrol edin</div>
      </template>
    </SplitShowcase>
    <br>
    <SplitShowcase>
      <template #ui>
        <button @click="console.table(['Item1', 'Item2', 'Item3'])" class="table-button" style=" width: 150px; padding: 5px; margin: 0 auto;">Table Button</button>
      </template>
      <template #command>
        <div>Butona basın ve console'u kontrol edin</div>
      </template>
    </SplitShowcase>
    <br>
    <div class="divider"></div>
    <br>
    <TheTopic title="Kullanıcı Bildirimleri"/>
    <Script title="Alert APIs">
      {{ alertCodes }}
    </Script>
    <br>
    <SplitShowcase>
      <template #ui>
        <button @click="triggerAlert" class="alert-button" style=" width: 150px; padding: 5px; margin: 0 auto;">Alert Button</button>
      </template>
      <template #command>
        <div>Butona basın</div>
      </template>
    </SplitShowcase>
    <br>
    <SplitShowcase>
      <template #ui>
        <button @click="triggerConfirm" class="confirm-button" style=" width: 150px; padding: 5px; margin: 0 auto;">Confirm Button</button>
      </template>
      <template #command>
        <div>Butona basın</div>
      </template>
    </SplitShowcase>
    <br>
    <SplitShowcase>
      <template #ui>
        <button @click="triggerPrompt" class="prompt-button" style=" width: 150px; padding: 5px; margin: 0 auto;">Prompt Button</button>
      </template>
      <template #command>
        <div>Butona basın</div>
      </template>
    </SplitShowcase>
    <br>
    <div class="divider"></div>
    <br>
    <TheTopic title="Zamanlayıcılar"/>
    <Script title="Timer APIs - setTimeout() & clearTimeout()">
      {{ timerCodes }}
    </Script>
    <br>
    <SplitShowcase>
      <template #ui>
        <button class="settimeout-btn" @click="startTimeout" style="width: 150px; padding: 5px; margin: 0 10px;">setTimeout</button>
        <button class="cleartimeout-btn" @click="clearTimeoutHandler" style="width: 150px; padding: 5px; margin: 0 10px;">clearTimeout</button>
      </template>
      <template #command>
        <div>"setTimeout" butonuna basınca 2 saniye sonra alert çıkar. "clearTimeout"'a basılırsa bekleyen işlem iptal olur.</div>
      </template>
    </SplitShowcase>
    <br>
    <div class="divider"></div>
    <br>
    <TheTopic title="Periyodik Zamanlayıcılar (setInterval & clearInterval)"/>
    <Script title="Timer APIs - setInterval() & clearInterval()">
      {{ intervalCodes }}
    </Script>
    <br>
    <SplitShowcase>
      <template #ui>
        <button class="setinterval-btn" @click="startInterval" style="width: 150px; padding: 5px; margin: 0 10px;">setInterval</button>
        <button class="clearinterval-btn" @click="clearIntervalHandler" style="width: 150px; padding: 5px; margin: 0 10px;">clearInterval</button>
      </template>
      <template #command>
        <div>"setInterval" butonuna basınca her saniye alert çıkar. "clearInterval"'a basılırsa periyodik işlem iptal olur.</div>
      </template>
    </SplitShowcase>
    <br>
    <div class="divider"></div>
    <br>
    <TheTopic title="Tarayıcı Depolama (Storage API)"/>
    <Script title="localStorage Kullanımı (Pure JS)">
      {{ localStorageCodes }}
    </Script>
    <br>
    <SplitShowcase>
      <template #ui>
        <input v-model="localInput" type="text" placeholder="Bir şey yazın" style="padding: 5px; margin: 0 10px;" />
        <button id="saveBtn" @click="saveToLocalStorage" style="padding: 5px; margin: 0 10px;">Kaydet</button>
        <button id="readBtn" @click="readFromLocalStorage" style="padding: 5px; margin: 0 10px;">Oku</button>
      </template>
      <template #command>
        <div>Bir şey yazıp "Kaydet" ile localStorage'a yazın, "Oku" ile localStorage'dan okuyun.</div>
      </template>
    </SplitShowcase>
    <br>
  </div>
</template>

<style>
.step-four {
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
  .step-four {
    max-height: 75vh;
    display: flex;
    align-items: center;
    overflow: scroll;
  }
}
</style>
