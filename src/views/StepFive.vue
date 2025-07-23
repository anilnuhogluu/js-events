<script setup lang="ts">
import { ref } from 'vue';

const modalVisible = ref(false);
const modalMessage = ref('');
const timeoutId = ref<number | null>(null);

const promiseDetails = [
  'Promise, “bir işin gelecekte tamamlanacağına” dair bir söz verir.',
]

const promiseFlow = [
  '✅ fulfilled (başarılı tamamlandı)',
  '❌ rejected (hata oluştu)',
  '⏳ pending (devam ediyor)',
]

const veriGetir = new Promise((resolve, reject) => {
    const durum = true;
    if (durum) {
      resolve("İşlem başarılı");
    } else {
      reject("Bir hata oluştu");
    }
});

const veriGetirme = new Promise((resolve, reject) => {
    const durum = false;
    if (durum) {
      resolve("İşlem başarılı");
    } else {
      reject("Bir hata oluştu");
    }
});

function showAlert(text: string) {
  modalMessage.value = text;
  modalVisible.value = true;
}

const promiseCode = `
  const veriGetir = new Promise((resolve, reject) => {
    const durum = true;
    if (durum) {
      resolve("İşlem başarılı");
    } else {
      reject("Bir hata oluştu");
    }
  });

  veriGetir
    .then(data => console.log(data))
    .catch(err => console.error(err));
`

const fetchCodes = `
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error("Bir hata oluştu:", error));
`

function fetchData() {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error("Bir hata oluştu:", error));
}

const asyncAwaitCode = `
  async function fetchData() {
    try {
      const response = await fetch("https://example.com/data");
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Hata oluştu:", error);
    }
  }
`

const asyncAwaitCode2 = `
  async function getUserData() {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
      if (!res.ok) throw new Error("Veri alınamadı");

      const user = await res.json();
      console.log("Kullanıcı:", user.name);
    } catch (err) {
      console.error("Hata:", err.message);
    }
  }
`

const awaitCode = `
  async function getData() {
    const res1 = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    const post = await res1.json();

    const res2 = await fetch("https://jsonplaceholder.typicode.com/users/1");
    const user = await res2.json();

    console.log(post, user);
}`

const promiseAllCode = `
  async function getDataParallel() {
    const [res1, res2] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/posts/1"),
      fetch("https://jsonplaceholder.typicode.com/users/1")
    ]);

    const [post, user] = await Promise.all([res1.json(), res2.json()]);
    console.log(post, user);
}
`

const getRequestCode = `
  document.querySelector("#get-posts").addEventReusableListener("click", async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await res.json();

    const ReusableList = document.querySelector("#post-ReusableList");
    ReusableList.innerHTML = posts.slice(0, 5).map(p => '<li>' + p.title + '</li>').join("");
  });
`

const postReusableList = ref<string[]>([]);
async function getPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();
  postReusableList.value = posts.slice(0, 5).map((p: any) => p.title);
}

const postRequestCode = `
  async function yeniPostGonder() {
    const endpoint = document.getElementById('endpoint').value;
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;
    const userId = document.getElementById('userId').value;
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
          title: title,
          body: body,
          userId: userId
        })
      });
      const data = await response.json();
      console.log("Sunucudan gelen yanıt:", data);
    } catch (error) {
      console.error("POST sırasında hata oluştu:", error);
    }
  }
`
const postEndpoint = ref("https://jsonplaceholder.typicode.com/posts");
const postTitle = ref("");
const postBody = ref("");
const postUserId = ref("");
const postResponse = ref("");
async function sendPost() {
  try {
    const response = await fetch(postEndpoint.value, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        title: postTitle.value,
        body: postBody.value,
        userId: postUserId.value
      })
    });
    const data = await response.json();
    postResponse.value = JSON.stringify(data, null, 2);
    showAlert(postResponse.value)
  } catch (error: any) {
    showAlert(postResponse.value)
    postResponse.value = "POST sırasında hata oluştu: " + error.message;
  }
}
</script>

<template>
  <div class="step-five">
    <TheModal :visible="modalVisible" :message="modalMessage" @close="modalVisible = false" />
    <TheTopic title="Fetch API ile Veri Çekme" />
    <br>
    <TheTopic title="Promise Nedir?" msg="Promise, JavaScript’te asenkron işlemleri daha kontrollü ve okunabilir bir şekilde yönetmek için kullanılan bir yapıdır."/>
    <ReusableList :items="promiseDetails" />
    <TheTopic msg="Üç farklı durumda olabilir:"/>
    <ReusableList :items="promiseFlow" />
    <br>
    <ExpandableScript title="Promise">
      {{ promiseCode }}
    </ExpandableScript>
    <SplitShowcase>
      <template #ui>
        <button @click="veriGetir.then(data => console.log(data)).catch(err => console.error(err));" style="padding: 5px; margin: 0 10px;">Resolve</button>
        <button @click="veriGetirme.then(data => console.log(data)).catch(err => console.error(err));" style="padding: 5px; margin: 0 10px;">Reject</button>
      </template>
      <template #command>
        <div>Data'yı çekmek için Resolve Buton'una basın.</div>
        <div>Hata'yı çekmek için Reject Buton'una basın.</div>
      </template>
    </SplitShowcase>
    <br>
    <div class="divider"></div>
    <br>
    <TheTopic title="fetch() Nedir?" msg="fetch() tarayıcının yerleşik Web API’lerinden biridir. Sunucudan veri almak veya sunucuya veri göndermek için kullanılır."/>
    <TheTopic msg="Her zaman bir Promise döner.
    "/>
    <ExpandableScript title="fetch()">
      {{ fetchCodes }}
    </ExpandableScript>
    <SplitShowcase>
      <template #ui>
        <button @click="fetchData" style="padding: 5px; margin: 0 10px;">Fetch Data</button>

      </template>
      <template #command>
        <div>Data'yı çekmek için Resolve Buton'una basın.</div>
      </template>
    </SplitShowcase>
    <br>
    <TheTopic title=".then() ve .catch() Nedir?" />
    <ReusableList :items="['.then(): İşlem başarılıysa çalışır.', '.catch(): Bir hata olursa çalışır.']"/>
    <br>
    <TheTopic title="async/await ile Fetch Kullanımı" msg="fetch() gibi API’ler asenkron çalışır. Bu, işlemlerin hemen değil, tamamlandığında sonuç vereceği anlamına gelir."/>
    <TheTopic msg="Eskiden Promise.then() zincirleriyle bu işlemler yapılırdı. Ancak:"/>
    <ReusableList :items="['Kodlar iç içe geçer', 'Hata yönetimi zorlaşır', 'Okunabilirlik azalır']" />
    <TheTopic msg="Bu sorunları çözmek için ES2017 (ES8) ile async/await geldi."/>
    <br>
    <ExpandableScript title="Temel Yapısı">
      {{ asyncAwaitCode  }}
    </ExpandableScript>
    <br>
    <ReusableTable :headers="['Satır', 'Açıklama']" :rows="[['async function', 'Bu fonksiyonun içinde await kullanılabilir hale gelir.'], ['await fetch(...)', 'fetch() işlemi bitene kadar beklenir, sonucu response değişkenine atanır.'], ['await response.json()', 'Gelen cevabı JavaScript nesnesine çevirir, yine beklenir.'], ['try/catch', 'Olası hatalar catch bloğunda kontrol altına alınır.']]" />
    <br>
    <TheTopic title="Avantajları:"/>
    <ReusableList :items="['Daha okunabilir: Kod senkron gibi akar', 'Hata yönetimi daha net (try/catch)', 'Zincirleme (.then().then()) gerekmez', 'Debug etmek kolay']"/>
    <br>
    <ExpandableScript title="Gerçek Kullanım:">
      {{ asyncAwaitCode2  }}
    </ExpandableScript>
    <br>
    <TheTopic title="Dikkat Edilmesi Gerekenler:" />
    <ReusableList :items="['await sadece async fonksiyonlar içinde çalışır.', 'fetch() işlemi başarılı bile olsa HTTP hatası dönebilir (res.ok ile kontrol et).', 'await sırayla çalışır → paralel işlemlerde Promise.all tercih edilebilir.']"/>
    <br>
    <ExpandableScript title="await">
      {{  awaitCode  }}
    </ExpandableScript>
    <br>
    <ExpandableScript title="Promise.all">
      {{  promiseAllCode  }}
    </ExpandableScript>
    <br>
    <div class="divider"></div>
    <br>
    <TheTopic title="fetch() - GET" />
    <ExpandableScript title="fetch() ile GET">
      {{ getRequestCode }}
    </ExpandableScript>
    <br>
    <SplitShowcase>
      <template #ui>
        <button id="get-posts" @click="getPosts" style="padding: 5px; margin: 0 10px;">Postları Getir</button>
        <ul id="post-ReusableList">
          <li v-for="(title, i) in postReusableList" :key="i">{{ title }}</li>
        </ul>
      </template>
      <template #command>
        <div>Butona basınca ilk 5 post başlığı ReusableListelenir.</div>
      </template>
    </SplitShowcase>
    <br>
    <div class="divider"></div>
    <br>
    <TheTopic title="fetch() - POST" />
    <ExpandableScript title="fetch() ile POST">
      {{ postRequestCode }}
    </ExpandableScript>
    <br>
    <SplitShowcase>
      <template #ui style="display: flex !important; flex-direction: column !important;">
        <form @submit.prevent="sendPost" style="display: flex; flex-direction: column; gap: 10px; max-width: 350px;">
          <input id="endpoint" v-model="postEndpoint" type="text" placeholder="Endpoint (örn: https://jsonplaceholder.typicode.com/posts)" style="padding: 5px;" />
          <input id="title" v-model="postTitle" type="text" placeholder="Başlık (title)" style="padding: 5px;" />
          <textarea title="body" v-model="postBody" placeholder="İçerik (body)" style="padding: 5px; height: 60px;"></textarea>
          <input tabindex="userId" v-model="postUserId" type="text" placeholder="User ID (userId)" style="padding: 5px;" />
          <button type="submit" style="padding: 5px;">POST Gönder</button>
        </form>
      </template>
      <template #command>
        <div>Endpoint, başlık, içerik ve userId girip POST Gönder'e basınca, endpoint'e veri gönderilir ve dönen yanıt aşağıda gösterilir.</div>
      </template>
    </SplitShowcase>
    <br>
  </div>
</template>

<style>
.step-five {
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
  .step-five {
    max-height: 75vh;
    display: flex;
    align-items: center;
    overflow: scroll;
  }
}
</style>
