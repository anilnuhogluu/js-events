<script setup lang="ts">
import TheTopic from '@/components/TheTopic.vue';
import Table from '@/components/ReusableTable.vue';
import List from '@/components/ReusableList.vue';
import Script from '@/components/ExpandableScript.vue';
import SplitShowcase from '@/components/SplitShowcase.vue';
import TheModal from '@/components/TheModal.vue';
import { ref, nextTick, onMounted } from 'vue';

const modalVisible = ref(false);
const modalMessage = ref('');

const headers = ['Event', 'Açıklama']
const mouseEvents = [
  ["click", "Tıklama"],
  ["dblclick", "Çift tıklama"],
  ["mousedown", "Mouse butonuna basma"],
  ["mouseup", "Mouse butonunu bırakma"],
  ["mouseenter", "Bir öğeye girince (bubbling yok)"],
  ["mouseleave", "Bir öğeden çıkınca (bubbling yok)"],
  ["mouseover", "Üzerine gelme (bubbling'li)"],
  ["mouseout", "Üzerinden çıkma (bubbling'li)"],
  ["mousemove", "Fare hareketi"],
  ["contextmenu", "Sağ tıklama menüsü"]
];

const keyboardEvents = [
  ["keydown", "Tuşa basıldığında"],
  ["keypress", "Karakter tuşuna basıldığında (deprecated)"],
  ["keyup", "Tuş bırakıldığında"]
];

const formInputEvents = [
  ["input", "Input değeri değiştiğinde"],
  ["change", "Değer değişip focus kaybedildiğinde"],
  ["submit", "Form gönderildiğinde"],
  ["reset", "Form sıfırlandığında"],
  ["focus", "Alan odaklandığında"],
  ["blur", "Alan odağını kaybettiğinde"],
  ["focusin", "Child focus'a geçtiğinde (bubble'lı)"],
  ["focusout", "Child focus'tan çıkınca (bubble'lı)"],
  ["invalid", "Form validation başarısızsa"]
];

const clipboardEvents = [
  ["copy", "Kopyalama yapıldığında"],
  ["cut", "Kesme yapıldığında"],
  ["paste", "Yapıştırma yapıldığında"]
];

const dragDropEvents = [
  ["drag", "Sürükleme başladı"],
  ["dragstart", "Sürükleme başlarken"],
  ["dragend", "Sürükleme bittiğinde"],
  ["dragenter", "Hedef alanına girildiğinde"],
  ["dragleave", "Hedef alanından çıkıldığında"],
  ["dragover", "Hedef alanın üzerindeyken"],
  ["drop", "Bırakma işlemi gerçekleştiğinde"]
];

const windowNavigationEvents = [
  ["load", "Sayfa tümüyle yüklendiğinde"],
  ["DOMContentLoaded", "DOM ağacı yüklendiğinde"],
  ["beforeunload", "Sayfadan çıkmadan önce"],
  ["unload", "Sayfa terk edilirken"],
  ["resize", "Pencere yeniden boyutlandığında"],
  ["scroll", "Scroll yapıldığında"],
  ["hashchange", "URL hash değiştiğinde"],
  ["popstate", "Tarayıcı geçmişi değiştiğinde (SPA)"]
];

const networkMediaEvents = [
  ["online", "Tarayıcı çevrimiçine geçince"],
  ["offline", "Tarayıcı çevrimdışına geçince"],
  ["play", "Medya oynatılıyor"],
  ["pause", "Medya duraklatıldı"],
  ["ended", "Medya bitti"],
  ["timeupdate", "Medya zamanı değiştiğinde"],
  ["volumechange", "Ses düzeyi değiştiğinde"],
  ["error", "Bir hata oluştuğunda"]
];

const animationTransitionEvents = [
  ["animationstart", "CSS animasyon başladı"],
  ["animationend", "CSS animasyon bitti"],
  ["animationiteration", "Animasyon yineledi"],
  ["transitionstart", "CSS geçişi başladı"],
  ["transitionend", "CSS geçişi bitti"],
  ["transitioncancel", "CSS geçişi iptal edildi"]
];

const touchPointerEvents = [
  ["touchstart", "Parmağın ekranla teması"],
  ["touchend", "Temasın bitmesi"],
  ["touchmove", "Parmağın hareketi"],
  ["pointerdown", "Her tür giriş için başlangıç"],
  ["pointerup", "Giriş bırakıldı"],
  ["pointermove", "Hareket"],
  ["pointerenter", "Elemente girildi"],
  ["pointerleave", "Elementten çıkıldı"]
];

const visibilityStorageEvents = [
  ["visibilitychange", "Sekme görünürlük değişti"],
  ["fullscreenchange", "Tam ekran mod değişti"],
  ["storage", "localStorage başka sekmede değişti"]
];

const observerLikeMechanisms = [
  ["MutationObserver", "DOM değişikliklerini izlemek için kullanılır (event değildir ama reaktiftir)"]
];

function showAlert(text: string) {
  modalMessage.value = text;
  modalVisible.value = true;
}

function setHash(hash: string) {
  window.location.hash = hash;
}

function expandTransitionBox(event: Event) {
  const target = event.target as HTMLElement | null;
  if (target) {
    target.style.width = '160px';
  }
}

function cancelTransition(event: Event) {
  const target = event.target as HTMLElement | null;
  if (target) {
    // Transition'ı iptal etmek için width'i aniden eski haline getir
    target.style.transition = 'none';
    target.style.width = '80px';
    // Sonra transition'u tekrar etkinleştir
    setTimeout(() => {
      target.style.transition = 'width 2s';
    }, 10);
  }
}

const clickCode = `document.querySelector('.click-button').addEventListener('click', function () {
  alert('Click Event'i tetiklendi!');
});`

const contextMenuCode = `document.querySelector('.contextmenu-button').addEventListener('contextmenu', function () {
  alert('Contextmenu Event'i tetiklendi!');
});`


const mouseoverCode = `document.querySelector('.mouseover-button').addEventListener('mouseover', function () {
  alert('Mouseover Event'i tetiklendi!');
});`

const mouseoutCode = `document.querySelector('.mouseout-button').addEventListener('mouseout', function () {
  alert('Mouseout Event'i tetiklendi!');
});`

const keyupCode = `document.querySelector('.keyup-input').addEventListener('keyup', function () {
  alert('Mouseout Event'i tetiklendi!');
});`

const keydownCode = `document.querySelector('.keydown-input').addEventListener('keydown', function () {
  alert('Mouseout Event'i tetiklendi!');
});`

const keypressCode = `document.querySelector('.keypress-input').addEventListener('keypress', function () {
  alert('Mouseout Event'i tetiklendi!');
});`

const inputCode = `document.querySelector('.input-input').addEventListener('input', function () {
  alert('Input Event'i tetiklendi!');
});`

const focusCode = `document.querySelector('.focus-input').addEventListener('focus', function () {
  alert('Focus Event'i tetiklendi!');
});`


const changeCode = `document.querySelector('.change-select').addEventListener('change', function () {
  alert('Change Event'i tetiklendi!');
});`

const blurCode = `document.querySelector('.blur-input').addEventListener('blur', function () {
  alert('Blur Event\'i tetiklendi!');
});`

const submitCode = `document.querySelector('.submit-form').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Submit Event\'i tetiklendi!');
});`

const copyCode = `document.querySelector('.copy-input').addEventListener('copy', function () {
  alert('Copy Event\'i tetiklendi!');
});`

const cutCode = `document.querySelector('.cut-input').addEventListener('cut', function () {
  alert('Cut Event\'i tetiklendi!');
});`

const pasteCode = `document.querySelector('.paste-input').addEventListener('paste', function () {
  alert('Paste Event\'i tetiklendi!');
});`

const dragstartCode = `document.querySelector('.drag-draggable').addEventListener('dragstart', function () {
  alert('Dragstart Event\'i tetiklendi!');
});`

const dragoverCode = `document.querySelector('.drag-dropzone').addEventListener('dragover', function (e) {
  e.preventDefault();
  // Drop alanının aktif olması için gerekli
  alert('Dragover Event\'i tetiklendi!');
});`

const dropCode = `document.querySelector('.drag-dropzone').addEventListener('drop', function () {
  alert('Drop Event\'i tetiklendi!');
});`

const resizeCode = `window.addEventListener('resize', function () {
  alert('Resize Event\'i tetiklendi!');
});`

const scrollCode = `window.addEventListener('scroll', function () {
  alert('Scroll Event\'i tetiklendi!');
});`

const hashchangeCode = `window.addEventListener('hashchange', function () {
  alert('Hashchange Event\'i tetiklendi!');
});`

const playCode = `document.querySelector('.media-audio').addEventListener('play', function () {
  alert('Play Event\'i tetiklendi!');
});`

const pauseCode = `document.querySelector('.media-audio').addEventListener('pause', function () {
  alert('Pause Event\'i tetiklendi!');
});`

const endedCode = `document.querySelector('.media-audio').addEventListener('ended', function () {
  alert('Ended Event\'i tetiklendi!');
});`

window.addEventListener("resize", () => {
  showAlert("Resize Event\' tetiklendi!")
});

window.addEventListener("hashchange", () => {
  showAlert("Hashchange Event\' tetiklendi!")
});

const animationstartCode = `document.querySelector('.anim-box').addEventListener('animationstart', function () {
  alert('Animationstart Event\'i tetiklendi!');
});`

const animationiterationCode = `document.querySelector('.anim-iteration-box').addEventListener('animationiteration', function () {
  alert('Animationiteration Event\'i tetiklendi!');
});`

const transitionstartCode = `document.querySelector('.trans-box').addEventListener('transitionstart', function () {
  alert('Transitionstart Event\'i tetiklendi!');
});`

const transitionendCode = `document.querySelector('.trans-end').addEventListener('transitionend', function () {
  alert('Transitionend Event\'i tetiklendi!');
});`

// Animasyon kutuları için ref'ler
const animBoxRef = ref<HTMLElement | null>(null);
const animIterationBoxRef = ref<HTMLElement | null>(null);

async function triggerAnimBox() {
  if (animBoxRef.value) {
    animBoxRef.value.style.animation = 'none';
    await nextTick();
    animBoxRef.value.style.animation = 'exampleAnim 1s linear';
  }
}

async function triggerAnimIterationBox() {
  if (animIterationBoxRef.value) {
    animIterationBoxRef.value.style.animation = 'none';
    await nextTick();
    animIterationBoxRef.value.style.animation = 'exampleAnim 0.5s linear 0s 2';
  }
}

const transEndWidth = ref(80);
function toggleTransitionBox() {
  transEndWidth.value = transEndWidth.value === 80 ? 160 : 80;
}

function changeLocalStorage() {
  window.localStorage.setItem('testKey', Date.now().toString());
}

document.addEventListener('visibilitychange', function () {
  if (document.visibilityState === 'hidden') {
    return
  } else {
    showAlert('Visibilitychange Event\'i tetiklendi!');
  }
});

window.addEventListener('storage', function () {
  showAlert('Storage Event\'i tetiklendi!');
});

const mutationBoxRef = ref<HTMLElement | null>(null);
function changeMutationBoxContent() {
  if (mutationBoxRef.value) {
    mutationBoxRef.value.textContent = 'Değişti! ' + Math.floor(Math.random() * 1000);
  }
}
onMounted(() => {
  if (mutationBoxRef.value) {
    const observer = new MutationObserver(function () {
      showAlert("MutationObserver Event'i tetiklendi!");
    });
    observer.observe(mutationBoxRef.value, { childList: true });
  }
});
</script>

<template>
  <div class="step-two">
    <TheModal :visible="modalVisible" :message="modalMessage" @close="modalVisible = false" />
    <TheTopic title="Mouse Events (Fare Olayları)" msg="Kullanıcının fare ile gerçekleştirdiği eylemleri (tıklama, üzerine gelme, sağ tıklama vb.) algılamak ve bu eylemlere tepki vermek için kullanılır. Örneğin: Bir butona tıklanınca bir işlem başlatmak."  />
    <Table :headers="headers" :rows="mouseEvents" />
    <br>
    <TheTopic title="Mouse Events Kullanımları"/>
    <br>

    <Script title="Click Event">
      {{ clickCode }}
    </Script>

    <br>

    <SplitShowcase>
      <template #ui>
        <button @click="showAlert('Click Event\'i tetiklendi!')" class="click-button" style=" width: 150px; padding: 5px; margin: 0 auto;">Button</button>
      </template>
      <template #command>
        <div>Butona basın</div>
      </template>
    </SplitShowcase>

    <br>

    <Script title="Mouseover Event">
      {{ contextMenuCode }}
    </Script>

    <br>

    <SplitShowcase>
      <template #ui>
        <button @contextmenu="showAlert('Contextmenu Event\'i tetiklendi!')" class="contextmenu-button" style=" width: 150px; padding: 5px; margin: 0 auto;">Button</button>
      </template>
      <template #command>
        <div>Butona sağ click ile basın</div>
      </template>
    </SplitShowcase>

    <br>

    <Script title="Mouseout Event">
      {{ mouseoverCode }}
    </Script>

    <br>

    <SplitShowcase>
      <template #ui>
        <button @mouseover="showAlert('Mouseover Event\'i tetiklendi!')" class="mouseover-button" style=" width: 150px; padding: 5px; margin: 0 auto;">Button</button>
      </template>
      <template #command>
        <div>Mouse'u butonun üstüne getirin</div>
      </template>
    </SplitShowcase>

    <br>

    <Script title="Contextmenu Event">
      {{ mouseoutCode }}
    </Script>
    <br>

    <SplitShowcase>
      <template #ui>
        <button @mouseout="showAlert('Mouseout Event\'i tetiklendi!')" class="mouseout-button" style=" width: 150px; padding: 5px; margin: 0 auto;">Button</button>
      </template>
      <template #command>
        <div>Mouse'u butonun üstüne getirin ve sonra çıkartın</div>
      </template>
    </SplitShowcase>

    <br>
    <div class="divider"></div>
    <br>
    <TheTopic title="Keyboard Events (Klavye Olayları)" msg="Kullanıcının klavye üzerindeki tuşlara basmasıyla oluşan olaylardır. Formlar, arama kutuları ve klavye kısayolları gibi etkileşimlerde kullanılır." />
    <Table :headers="headers" :rows="keyboardEvents" />
    <br>
    <TheTopic title="Keyboard Events Kullanımları"/>
    <br>

    <Script title="Keyup Event">
      {{ keyupCode }}
    </Script>

    <br>

    <SplitShowcase>
      <template #ui>
        <input type="text" placeholder="Example" @keyup="showAlert('Keyup Event\'i tetiklendi!')" class="keyup-input" style=" width: 150px; padding: 5px; margin: 0 auto;">
      </template>
      <template #command>
        <div>Tuşa basın ve kaldırın</div>
      </template>
    </SplitShowcase>

    <br>

    <Script title="Keydown Event">
      {{ keydownCode }}
    </Script>

    <br>

    <SplitShowcase>
      <template #ui>
        <input type="text" placeholder="Example" @keydown="showAlert('Keydown Event\'i tetiklendi!')" class="keydown-input" style=" width: 150px; padding: 5px; margin: 0 auto;">
      </template>
      <template #command>
        <div>Tuşa basın</div>
      </template>
    </SplitShowcase>

    <br>

    <Script title="Keypress Event">
      {{ keypressCode }}
    </Script>

    <br>

    <SplitShowcase>
      <template #ui>
        <input type="text" placeholder="Example" @keypress="showAlert('Keypress Event\'i tetiklendi!')" class="keypress-input" style=" width: 150px; padding: 5px; margin: 0 auto;">
      </template>
      <template #command>
        <div>Tuşa basın</div>
      </template>
    </SplitShowcase>

    <br>
    <div class="divider"></div>
    <br>
    <TheTopic title="Input/Form Events" msg="Form elemanlarında (input, textarea, checkbox, select, form) gerçekleşen değişiklikleri algılar. Kullanıcının veri girişi, form gönderimi ve doğrulama süreçlerinde kullanılır." />
    <Table :headers="headers" :rows="formInputEvents" />
    <br>

    <Script title="Input Event">
      {{ inputCode }}
    </Script>

    <br>

    <SplitShowcase>
      <template #ui>
        <input type="text" placeholder="Example" @input="showAlert('Input Event\'i tetiklendi!')" class="input-input" style=" width: 150px; padding: 5px; margin: 0 auto;">
      </template>
      <template #command>
        <div>Input'u doldurun</div>
      </template>
    </SplitShowcase>

    <br>

    <Script title="Focus Event">
      {{ focusCode }}
    </Script>

    <br>

    <SplitShowcase>
      <template #ui>
        <input type="text" placeholder="Example" @focus="showAlert('Focus Event\'i tetiklendi!')" class="focus-input" style=" width: 150px; padding: 5px; margin: 0 auto;">
      </template>
      <template #command>
        <div>Input'a tıklayın</div>
      </template>
    </SplitShowcase>

    <br>

    <Script title="Change Event">
      {{ changeCode }}
    </Script>

    <br>

    <SplitShowcase>
      <template #ui>
        <select type="text" placeholder="Example" @change="showAlert('Change Event\'i tetiklendi!')" class="change-select" style=" width: 150px; padding: 5px; margin: 0 auto;">
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

    <Script title="Blur Event">
      {{ blurCode }}
    </Script>

    <br>

    <SplitShowcase>
      <template #ui>
        <input type="text" placeholder="Example" @blur="showAlert('Blur Event\'i tetiklendi!')" class="blur-input" style=" width: 150px; padding: 5px; margin: 0 auto;">
      </template>
      <template #command>
        <div>Input'a tıklayın ve sonra başka bir yere tıklayarak odağı kaldırın</div>
      </template>
    </SplitShowcase>

    <br>

    <Script title="Submit Event">
      {{ submitCode }}
    </Script>

    <br>

    <SplitShowcase>
      <template #ui>
        <form class="submit-form" @submit.prevent="showAlert('Submit Event\'i tetiklendi!')" style="display: flex; flex-direction: column; gap: 8px; width: 200px; margin: 0 auto;">
          <input type="text" placeholder="Adınız" required style="padding: 5px;">
          <button type="submit" style="padding: 5px;">Gönder</button>
        </form>
      </template>
      <template #command>
        <div>Formu doldurup gönderin</div>
      </template>
    </SplitShowcase>

    <br>
    <div class="divider"></div>
    <br>
    <TheTopic title="Clipboard Events" msg="Kullanıcının bir öğeyi kopyalaması, kesmesi veya yapıştırması gibi işlem sırasında tetiklenir. Özellikle güvenlik, metin işleme veya kullanıcı deneyimi açısından önemlidir." />
    <Table :headers="headers" :rows="clipboardEvents" />
    <br>
       <Script title="Copy Event">
      {{ copyCode }}
    </Script>
    <br>
    <SplitShowcase>
      <template #ui>
        <input type="text" value="Kopyala beni" @copy="showAlert('Copy Event\'i tetiklendi!')" class="copy-input" style=" width: 200px; padding: 5px; margin: 0 auto;">
      </template>
      <template #command>
        <div>Input içindeki metni seçip kopyalayın (Ctrl+C veya sağ tık → Kopyala)</div>
      </template>
    </SplitShowcase>
    <br>
    <Script title="Cut Event">
      {{ cutCode }}
    </Script>
    <br>
    <SplitShowcase>
      <template #ui>
        <input type="text" value="Kes beni" @cut="showAlert('Cut Event\'i tetiklendi!')" class="cut-input" style=" width: 200px; padding: 5px; margin: 0 auto;">
      </template>
      <template #command>
        <div>Input içindeki metni seçip kesin (Ctrl+X veya sağ tık → Kes)</div>
      </template>
    </SplitShowcase>
    <br>
    <Script title="Paste Event">
      {{ pasteCode }}
    </Script>
    <br>
    <SplitShowcase>
      <template #ui>
        <input type="text" placeholder="Buraya yapıştırın" @paste="showAlert('Paste Event\'i tetiklendi!')" class="paste-input" style=" width: 200px; padding: 5px; margin: 0 auto;">
      </template>
      <template #command>
        <div>Input'a tıklayın ve bir şey yapıştırın (Ctrl+V veya sağ tık → Yapıştır)</div>
      </template>
    </SplitShowcase>
    <br>
    <div class="divider"></div>
    <br>
    <TheTopic title="Drag & Drop Events" msg="Bir öğeyi sürükleme ve bırakma etkileşimlerini kontrol etmeye yarar. Dosya yüklemeleri, listelerde öğe sıralama gibi işlemler için kullanılır." />
    <Table :headers="headers" :rows="dragDropEvents" />
    <br>
    <Script title="Dragstart Event">
      {{ dragstartCode }}
    </Script>
    <br>
    <SplitShowcase>
      <template #ui>
        <div style="display: flex; justify-content: center; align-items: center; gap: 32px;">
          <div draggable="true" @dragstart="showAlert('Dragstart Event\'i tetiklendi!')" class="drag-draggable" style="width: 80px; height: 80px; background: #4caf50; color: #fff; display: flex; align-items: center; justify-content: center; border-radius: 8px; cursor: grab;">Sürükle</div>
        </div>
      </template>
      <template #command>
        <div>Kutuya tıklayıp sürüklemeye başlayın</div>
      </template>
    </SplitShowcase>
    <br>
    <Script title="Dragover Event">
      {{ dragoverCode }}
    </Script>
    <br>
    <SplitShowcase>
      <template #ui>
        <div style="display: flex; justify-content: center; align-items: center; gap: 32px;">
          <div draggable="true" class="drag-draggable" style="width: 80px; height: 80px; background: #4caf50; color: #fff; display: flex; align-items: center; justify-content: center; border-radius: 8px; cursor: grab;">Sürükle</div>
          <div class="drag-dropzone" @dragover.prevent="showAlert('Dragover Event\'i tetiklendi!')" style="width: 120px; height: 80px; border: 2px dashed #2196f3; display: flex; align-items: center; justify-content: center; border-radius: 8px;">Drop Alanı</div>
        </div>
      </template>
      <template #command>
        <div>Yeşil kutuyu mavi drop alanının üstüne sürükleyin (üzerinde bekletin)</div>
      </template>
    </SplitShowcase>
    <br>
    <Script title="Drop Event">
      {{ dropCode }}
    </Script>
    <br>
    <SplitShowcase>
      <template #ui>
        <div style="display: flex; justify-content: center; align-items: center; gap: 32px;">
          <div draggable="true" class="drag-draggable" style="width: 80px; height: 80px; background: #4caf50; color: #fff; display: flex; align-items: center; justify-content: center; border-radius: 8px; cursor: grab;">Sürükle</div>
          <div class="drag-dropzone" @drop="showAlert('Drop Event\'i tetiklendi!')" @dragover.prevent style="width: 120px; height: 80px; border: 2px solid #f44336; display: flex; align-items: center; justify-content: center; border-radius: 8px;">Drop Alanı</div>
        </div>
      </template>
      <template #command>
        <div>Yeşil kutuyu kırmızı drop alanına bırakın</div>
      </template>
    </SplitShowcase>
    <br>
    <div class="divider"></div>
    <br>
    <TheTopic title="Window & Document Events" msg="Tarayıcı penceresi veya sayfa (document) ile ilgili olayları kapsar. Sayfa yüklendiğinde, boyutu değiştiğinde, scroll yapıldığında veya kullanıcı sayfadan çıkmak üzereyken devreye girer."  />
    <Table :headers="headers" :rows="windowNavigationEvents" />
    <br>
     <Script title="Resize Event">
      {{ resizeCode }}
    </Script>
    <br>
    <SplitShowcase>
      <template #ui>
        <div style="width: 100%; text-align: center;">Pencere boyutunu değiştirin (ör: pencereyi küçültüp büyütün)</div>
      </template>
      <template #command>
        <div>Tarayıcı penceresini yeniden boyutlandırın</div>
      </template>
    </SplitShowcase>
    <br>
    <Script title="Scroll Event">
      {{ scrollCode }}
    </Script>
    <br>
    <SplitShowcase>
      <template #ui>
        <div @scroll="showAlert('Scroll Event\'i tetiklendi!')" style="height: 120px; overflow: auto; border: 1px solid #ccc; padding: 8px; width: 100%; max-width: 350px; margin: 0 auto;">
          <div style="height: 300px; background: linear-gradient(white, #e3f2fd);">Burayı kaydırın</div>
        </div>
      </template>
      <template #command>
        <div>Kutunun içini kaydırın</div>
      </template>
    </SplitShowcase>
    <br>
    <Script title="Hashchange Event">
      {{ hashchangeCode }}
    </Script>
    <br>
    <SplitShowcase>
      <template #ui>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <button @click="setHash('ornek1')" style="padding: 5px 12px;">#ornek1</button>
          <button @click="setHash('ornek2')" style="padding: 5px 12px;">#ornek2</button>
          <button @click="setHash('')" style="padding: 5px 12px;">Hash'i temizle</button>
        </div>
      </template>
      <template #command>
        <div>Butonlara tıklayarak URL hash kısmını değiştirin</div>
      </template>
    </SplitShowcase>
    <br>
    <div class="divider"></div>
    <br>
    <TheTopic title="Network & Media Events" msg="İnternet bağlantısı durum değişiklikleri ve medya oynatımıyla ilgili olayları kapsar. Kullanıcının çevrimdışı kalması, videonun başlaması ya da bitmesi gibi durumlarda kullanılır." />
    <Table :headers="headers" :rows="networkMediaEvents" />
    <br>
    <Script title="Play Event">
      {{ playCode }}
    </Script>
    <br>
    <SplitShowcase>
      <template #ui>
        <audio class="media-audio" @play="showAlert('Play Event\'i tetiklendi!')" controls style="width: 200px;">
          <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg">
        </audio>
      </template>
      <template #command>
        <div>Play tuşuna basın</div>
      </template>
    </SplitShowcase>
    <br>
    <Script title="Pause Event">
      {{ pauseCode }}
    </Script>
    <br>
    <SplitShowcase>
      <template #ui>
        <audio class="media-audio" controls @pause="showAlert('Pause Event\'i tetiklendi!')" style="width: 200px;">
          <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg">
        </audio>
      </template>
      <template #command>
        <div>Pause tuşuna basın veya oynatmayı durdurun</div>
      </template>
    </SplitShowcase>
    <br>
    <Script title="Ended Event">
      {{ endedCode }}
    </Script>
    <br>
    <SplitShowcase>
      <template #ui>
        <audio class="media-audio" controls @ended="showAlert('Ended Event\'i tetiklendi!')" style="width: 200px;">
          <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg">
        </audio>
      </template>
      <template #command>
        <div>Şarkı bitene kadar bekleyin</div>
      </template>
    </SplitShowcase>
    <br>
    <div class="divider"></div>
    <br>
    <TheTopic title="Animation & Transition Events" msg="CSS ile tanımlanan animasyonlar ve geçişler sırasında gerçekleşen olaylardır. Bir animasyon başladığında, sona erdiğinde veya tekrar ettiğinde devreye girer." />
    <Table :headers="headers" :rows="animationTransitionEvents" />
    <br>
    <Script title="Animationstart Event">
      {{ animationstartCode }}
    </Script>
    <br>
    <SplitShowcase>
      <template #ui>
        <div  @animationstart="showAlert('Animationstart Event\'i tetiklendi!')" style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <div ref="animBoxRef" class="anim-box" style="width: 80px; height: 80px; background: #ff9800;"></div>
          <button @click="triggerAnimBox" style="margin-top: 8px;">Animasyonu Başlat</button>
        </div>
      </template>
      <template #command>
        <div>Butona tıklayın, animasyon başlasın</div>
      </template>
    </SplitShowcase>
    <br>
    <Script title="Animationiteration Event">
      {{ animationiterationCode }}
    </Script>
    <br>
    <SplitShowcase>
      <template #ui>
        <div @animationiteration="showAlert('Animationiteration Event\'i tetiklendi!')" style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <div ref="animIterationBoxRef" class="anim-iteration-box" style="width: 80px; height: 80px; background: #ff9800;"></div>
          <button @click="triggerAnimIterationBox" style="margin-top: 8px;">Animasyonu Başlat (2 tekrar)</button>
        </div>
      </template>
      <template #command>
        <div>Butona tıklayın, animasyon tekrar etsin</div>
      </template>
    </SplitShowcase>
    <br>
    <Script title="Transitionstart Event">
      {{ transitionstartCode }}
    </Script>
    <br>
    <SplitShowcase>
      <template #ui>
        <div class="trans-box" @transitionstart="showAlert('Transitionstart Event\'i tetiklendi!')" style="width: 80px; height: 80px; background: #00bcd4; transition: width 1s;" @click="expandTransitionBox($event)">Tıkla</div>
      </template>
      <template #command>
        <div>Kutuya tıklayın, genişliği artınca transitionstart tetiklenir</div>
      </template>
    </SplitShowcase>
    <br>
    <Script title="Transitionend Event">
      {{ transitionendCode }}
    </Script>
    <br>
    <SplitShowcase>
      <template #ui>
        <div
          class="trans-end"
          @transitionend="showAlert('Transitionend Event\'i tetiklendi!')"
          :style="`width: ${transEndWidth}px; height: 80px; background: #e91e63; transition: width 2s;`"
          @click="toggleTransitionBox"
        >
          Tıkla
        </div>
      </template>
      <template #command>
        <div>Kutuya tıklayın, transition bitince event tetiklenir</div>
      </template>
    </SplitShowcase>
    <br>
    <div class="divider"></div>
    <br>
    <TheTopic title="Touch & Pointer Events (Mobil / Tablet)" msg="Mobil cihazlar, tabletler ve stylus gibi aygıtlarla yapılan dokunma etkileşimleri ile fare/dokunmatik girişleri birleştirir. Modern tarayıcılar için hem dokunmatik hem mouse destekli sistemlerde önemlidir."  />
    <Table :headers="headers" :rows="touchPointerEvents" />
    <br>
    <!-- Touchstart örneği -->
    <Script title="Touchstart Event">
      document.querySelector('.touchstart-box').addEventListener('touchstart', function () {
        alert('Touchstart Event\'i tetiklendi!');
      });
    </Script>
    <br>
    <SplitShowcase>
      <template #ui>
        <div class="touchstart-box" @touchstart="showAlert('Touchstart Event\'i tetiklendi!')" style="width: 120px; height: 80px; background: #4caf50; color: #fff; display: flex; align-items: center; justify-content: center; border-radius: 8px; margin: 0 auto;">Dokun</div>
      </template>
      <template #command>
        <div>Mobilde kutuya dokunun</div>
      </template>
    </SplitShowcase>
    <br>
    <!-- Touchend örneği -->
    <Script title="Touchend Event">
      document.querySelector('.touchend-box').addEventListener('touchend', function () {
        alert('Touchend Event\'i tetiklendi!');
      });
    </Script>
    <br>
    <SplitShowcase>
      <template #ui>
        <div class="touchend-box" @touchend="showAlert('Touchend Event\'i tetiklendi!')" style="width: 120px; height: 80px; background: #2196f3; color: #fff; display: flex; align-items: center; justify-content: center; border-radius: 8px; margin: 0 auto;">Dokun ve bırak</div>
      </template>
      <template #command>
        <div>Mobilde kutuya dokunun ve parmağınızı kaldırın</div>
      </template>
    </SplitShowcase>
    <br>
    <!-- Touchmove örneği -->
    <Script title="Touchmove Event">
      document.querySelector('.touchmove-box').addEventListener('touchmove', function () {
        alert('Touchmove Event\'i tetiklendi!');
      });
    </Script>
    <br>
    <SplitShowcase>
      <template #ui>
        <div class="touchmove-box" @touchmove="showAlert('Touchmove Event\'i tetiklendi!')" style="width: 120px; height: 80px; background: #ff9800; color: #fff; display: flex; align-items: center; justify-content: center; border-radius: 8px; margin: 0 auto;">Kaydır</div>
      </template>
      <template #command>
        <div>Mobilde kutunun üzerinde parmağınızı kaydırın</div>
      </template>
    </SplitShowcase>
    <br>
    <div class="divider"></div>
    <br>
    <TheTopic title="Security & System Events" msg="Sayfa görünürlüğü, tam ekran modu veya localStorage değişimi gibi sistemsel olayları yakalamaya yarar. Bir sekme gizlendiğinde analiz durdurmak veya başka sekmede yapılan değişiklikleri senkronize etmek için kullanılır."  />
    <Table :headers="headers" :rows="visibilityStorageEvents" />
    <br>
    <!-- visibilitychange örneği -->
    <Script title="Visibilitychange Event">
      document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === 'hidden') {
          alert('Sekme gizlendi!');
        } else {
          alert('Sekme tekrar görünür!');
        }
      });
    </Script>
    <br>
    <SplitShowcase>
      <template #ui>
        <div style="width: 100%; text-align: center;">Sekmeyi gizleyip tekrar açın (başka sekmeye geçin ve geri gelin)</div>
      </template>
      <template #command>
        <div>Başka bir sekmeye geçin ve tekrar bu sekmeye dönün</div>
      </template>
    </SplitShowcase>
    <br>
    <!-- storage örneği -->
    <Script title="Storage Event">
      window.addEventListener('storage', function (e) {
        alert('localStorage başka bir sekmede değişti!');
      });
    </Script>
    <br>
    <SplitShowcase>
      <template #ui>
        <button @click="changeLocalStorage" style="padding: 8px 16px; margin: 0 auto; display: block;">localStorage Değiştir</button>
        <div style="margin-top: 8px; text-align: center;">Bu butona başka bir sekmede de tıklayın, burada alert göreceksiniz.</div>
      </template>
      <template #command>
        <div>Projeyi iki sekmede açın, birinde butona tıklayın, diğerinde alert göreceksiniz</div>
      </template>
    </SplitShowcase>
    <br>
    <div class="divider"></div>
    <br>
    <TheTopic title="Mutation & Observer Events"  msg="DOM'da yapılan değişiklikleri algılamak için kullanılır. Örneğin bir öğe DOM’a eklendiğinde veya değiştiğinde MutationObserver ile tespit edilebilir. Not: Bu bir “event listener“ değil, ancak reaktif davranış sağlar." />
    <Table :headers="headers" :rows="observerLikeMechanisms" />
    <br>
    <!-- MutationObserver örneği -->
    <Script title="MutationObserver Kullanımı">
      const target = document.querySelector('.mutation-box');
      const observer = new MutationObserver(function(mutationsList, observer) {
        alert('MutationObserver tetiklendi!');
      });
      observer.observe(target, { childList: true });
      // Buton ile target'ın içeriği değiştirilebilir
    </Script>
    <br>
    <SplitShowcase>
      <template #ui>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <div class="mutation-box" ref="mutationBoxRef" style="width: 180px; height: 60px; background: #607d8b; color: #fff; display: flex; align-items: center; justify-content: center; border-radius: 8px; margin-bottom: 8px;">Başlangıç</div>
          <button @click="changeMutationBoxContent" style="padding: 6px 16px;">İçeriği Değiştir</button>
        </div>
      </template>
      <template #command>
        <div>Butona tıklayın, kutunun içeriği değişsin ve observer tetiklensin</div>
      </template>
    </SplitShowcase>
    <br>
  </div>
</template>

<style>
.step-two {
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 100%;
}

.divider {
  width: 100%;
  border: 2px solid #fff;
}

@media (min-width: 1024px) {
  .step-two {
    max-height: 75vh;
    display: flex;
    align-items: center;
    overflow: scroll;
  }
}
@keyframes exampleAnim {
  0% { transform: scale(1); }
  100% { transform: scale(1.5); }
}
</style>
