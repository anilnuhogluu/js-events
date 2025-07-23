<script setup lang="ts">
import { ref } from 'vue';

const modalVisible = ref(false);
const modalMessage = ref('');

const githubUsername = ref("");
const githubUserData = ref<any | null>(null);
const githubUserError = ref("");
async function fetchGithubUser() {
  githubUserError.value = "";
  githubUserData.value = null;
  const username = githubUsername.value.trim();
  if (!username) {
    githubUserError.value = "Kullanıcı adı giriniz.";
    return;
  }
  const res = await fetch("https://api.github.com/users/" + username);
  if (!res.ok) {
    githubUserError.value = "Kullanıcı bulunamadı.";
    return;
  }
  const data = await res.json();
  githubUserData.value = data;
}

function clearGithubResult() {
  githubUsername.value = "";
  githubUserData.value = null;
  githubUserError.value = "";
}

const githubExampleCode = `
  document.getElementById("fetchBtn").addEventListener("click", async () => {
    const username = document.getElementById("username").value.trim();
    const res = await fetch("https://api.github.com/users/" + username);

    if (!res.ok) {
      return (document.getElementById("result").innerText = "Kullanıcı bulunamadı.");
    }

    const data = await res.json();

    document.getElementById("result").innerHTML =
      '<img src=\"' + data.avatar_url + '\" width=\"100\" />' +
      '<p><strong>' + (data.name || data.login) + '</strong></p>' +
      '<p>Takipçi: ' + data.followers + '</p>' +
      '<p>Repo sayısı: ' + data.public_repos + '</p>' +
      '<p><a href=\"' + data.html_url + '\" target=\"_blank\">GitHub Profili</a></p>';
  });
`

const weatherExample = `
  async function getWeatherByCity(city) {
    // 1. Şehir için lat/lon al
    const geoRes = await fetch(
      "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + API_KEY
    );
    const geoData = await geoRes.json();

    if (!geoData.length) {
      console.log("Şehir bulunamadı.");
      return;
    }

    const { lat, lon } = geoData[0];

    // 2. Lat/Lon ile hava durumu al
    const weatherRes = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + API_KEY + "&units=metric"
    );
    const weatherData = await weatherRes.json();

    console.log("Hava durumu:", weatherData);
  }

  document.getElementById("weatherBtn").addEventListener("click", async () => {
    const API_KEY = document.getElementById("api-key").value.trim();
    const city = document.getElementById("city").value.trim();
    await getWeatherByCity(city);
  });
`

const weatherCity = ref("");
const weatherApiKey = ref("");
const weatherData = ref<any | null>(null);
const weatherError = ref("");
async function fetchWeather() {
  weatherError.value = "";
  weatherData.value = null;
  const city = weatherCity.value.trim();
  const apiKey = weatherApiKey.value.trim();

  if (!city) {
    weatherError.value = "Şehir adı giriniz.";
    return;
  }
  if (!apiKey) {
    weatherError.value = "API Key giriniz.";
    return;
  }

  try {
    // 1. Şehir için lat/lon al
    const geoUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + apiKey;
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();

    if (!geoRes.ok) throw new Error(geoData.msg)

    if (!geoData.length) {
      weatherError.value = "Şehir bulunamadı.";
      return;
    }

    const { lat, lon } = geoData[0];

    const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=metric";
    const weatherRes = await fetch(weatherUrl);
    const weatherData = await weatherRes.json();

    weatherData.value = weatherData;
  } catch (err: any) {
    weatherError.value = "API hatası: " + err;
  }
}
function clearWeatherResult() {
  weatherCity.value = "";
  weatherApiKey.value = "";
  weatherData.value = null;
  weatherError.value = "";
}
</script>

<template>
  <div class="step-six">
    <TheModal :visible="modalVisible" :message="modalMessage" @close="modalVisible = false" />
    <TheTopic title="Public API Entegrasyonu" msg="Kullanıcıdan veri al, gerçek bir API’ye istek at, sonuçları göster."/>
    <TheTopic msg="Hedef: Gerçek dünyaya veriyle bağlanmayı göstermek."/>
    <br>
    <TheTopic title="Public API Nedir?" msg="Public API'ler, herkese açık olarak sunulan, çoğu zaman kayıtlı veya kayıtsız kullanılabilen API’lardır."/>
    <List :items="['Genellikle GET ve POST istekleri destekler.', 'Bazıları API Key ister, bazıları doğrudan kullanılabilir.']"/>
    <br>
    <TheTopic title="API Key Nedir?" msg="API Key, bir servisi kullanan uygulamayı tanımak ve erişimi sınırlandırmak için verilen özel bir anahtardır."/>
    <List :items="['Tıpkı bir şifre gibi.', 'API sağlayıcısı tarafından verilir.', 'Bazı API’ler API Key olmadan kullanılabilir (GitHub gibi).']"/>
    <br>
    <div class="divider"></div>
    <br>
    <TheTopic title="Uygulama 1: GitHub API ile Kullanıcı Bilgisi Çekme"/>
    <br>
    <TheTopic title="Kullanım Hedefi:"/>
    <List :items="['Kullanıcıdan GitHub kullanıcı adı al', 'https://api.github.com/users/USERNAME adresine istek at', 'Gelen veriyi DOM\'da görüntüle']"/>
    <br>
    <ExpandableScript title="Github üzerinden kullanıcı bilgilerini çekme">
      {{ githubExampleCode  }}
    </ExpandableScript>
    <br>
    <List :items="['fetch() ile veri çekiyoruz', 'async/await kullanımı', 'API dönen JSON objesi', 'DOM’a veriyi yerleştirme']"/>
    <br>
    <SplitShowcase>
      <template #ui>
        <div style="display: flex; flex-direction: column;">
          <input id="username" v-model="githubUsername" type="text" placeholder="GitHub kullanıcı adı" style="padding: 5px; margin: 0 10px;" />
          <button @click="fetchGithubUser" style="padding: 5px; margin: 0 10px;">Bilgileri Getir</button>
          <button @click="clearGithubResult" style="padding: 5px; margin: 0 10px;">Sonuçları Sıfırla</button>
        </div>
      </template>
      <template #command>
        <div>Kullanıcı adı girip "Bilgileri Getir" butonuna basınca, GitHub API'den bilgiler çekilir ve ekranda gösterilir.</div>
      </template>
    </SplitShowcase>
    <div id="result" style="margin-top: 15px;">
        <div v-if="githubUserError" style="color: red;">{{ githubUserError }}</div>
        <div v-else-if="githubUserData">
        <img :src="githubUserData.avatar_url" width="100" />
        <p><strong>{{ githubUserData.name || githubUserData.login }}</strong></p>
        <p>Takipçi: {{ githubUserData.followers }}</p>
        <p>Repo sayısı: {{ githubUserData.public_repos }}</p>
        <p><a :href="githubUserData.html_url" target="_blank">GitHub Profili</a></p>
      </div>
    </div>
    <br>
    <div class="divider"></div>
    <br>
    <TheTopic title="Uygulama 2: OpenWeather API"/>
    <br>
    <TheTopic title="Kullanım Hedefi:"/>
    <List :items="['Kullanıcı şehir girsin', 'API’den o şehir için hava durumu verisi alınsın', 'DOM’a hava + sıcaklık + ikon gösterilsin']"/>
    <TheTopic msg="Not: OpenWeather API API Key gerektirir."/>
    <br>
    <TheTopic title="Hazırlık:"/>
    <List :items="['https://openweathermap.org/ → kayıt → API Key alın', 'Geo API: https://api.openweathermap.org/geo/1.0/direct?q=ISTANBUL&limit=1&appid=YOUR_KEY', 'Weather API: https://api.openweathermap.org/data/2.5/weather?lat=41.0082&lon=28.9784&appid=YOUR_KEY&units=metric']"/>
    <br>
    <ExpandableScript title="OpenWeather API ile Hava Durumu">
      {{ weatherExample }}
    </ExpandableScript>
    <br>
    <SplitShowcase>
      <template #ui>
        <div style="display: flex; flex-direction: column;">
          <input id="api-key" v-model="weatherApiKey" type="text" placeholder="API Key" style="padding: 5px; margin: 0 10px;" />
          <input id="city" v-model="weatherCity" type="text" placeholder="Şehir adı" style="padding: 5px; margin: 0 10px;" />
          <button @click="fetchWeather" style="padding: 5px; margin: 0 10px;">Hava Durumu Getir</button>
          <button @click="clearWeatherResult" style="padding: 5px; margin: 0 10px;">Sonuçları Sıfırla</button>
          <div id="weatherResult" style="margin-top: 15px;">
            <div v-if="weatherError" style="color: red;">{{ weatherError }}</div>
            <div v-else-if="weatherData">
              <p><strong>{{ weatherData.name }}</strong></p>
              <p>{{ weatherData.weather[0].description }}</p>
              <p>Sıcaklık: {{ weatherData.main.temp }}°C</p>
              <img :src="'https://openweathermap.org/img/wn/' + weatherData.weather[0].icon + '@2x.png'" />
            </div>
          </div>
        </div>
      </template>
      <template #command>
        <div>API Key ve şehir adı girip "Hava Durumu Getir" butonuna basınca, OpenWeather API'den hava durumu bilgileri çekilir ve ekranda gösterilir.</div>
      </template>
    </SplitShowcase>
    <br>
  </div>
</template>

<style>
.step-six {
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
  .step-six {
    max-height: 75vh;
    display: flex;
    align-items: center;
    overflow: scroll;
  }
}
</style>
