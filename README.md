# Jubbio Bot Template 🚀

Jubbio platformu için TypeScript ve `@jubbio/core` kütüphanesi kullanılarak hazırlanmış, gelişmiş, modüler bot altyapısı (boilerplate). Bu şablonu kullanarak kendi Jubbio botlarınızı hızlıca geliştirmeye başlayabilirsiniz.

## 🌟 Özellikler

- **TypeScript Desteği**: Güçlü tip denetimi ile daha güvenli ve hatasız kodlama.
- **Modüler Yapı**: Komutlar (`src/commands`) ve event'ler (`src/events`) tamamen ayrı dosyalarda, düzenli bir şekilde yönetilir.
- **Dinamik Yükleme**: `commandHandler` ve `eventHandler` ile yeni komut ve event eklemek sadece yeni bir dosya oluşturmak kadar kolay.
- **Slash (/) Komutları**: Slash komutlarını otomatik olarak kaydetme (`bulkOverwriteGlobalCommands`) desteği.

## 🛠️ Kurulum

### 1. Projeyi Klonlayın

```bash
git clone https://github.com/keremlchh/jubbio-bot-template.git
cd jubbio-bot-template
```

### 2. Gerekli Bağımlılıkları Yükleyin

Node.js (v18 veya üzeri önerilir) kurulu olduğundan emin olun, ardından aşağıdaki komutu çalıştırın:

```bash
npm install
```

### 3. Yapılandırma Dosyalarını Hazırlayın

Projede bulunan örnek yapılandırma dosyalarını kopyalayarak asıl dosyaları oluşturun:

```bash
# Windows (PowerShell) için:
Copy-Item .env.example .env
Copy-Item config.example.json config.json

# Linux / Mac için:
cp .env.example .env
cp config.example.json config.json
```

Oluşturduğunuz **`.env`** dosyasını açıp bot token'ınızı ekleyin:
```env
BOT_TOKEN=sizin_jubbio_bot_tokeniniz
```

Oluşturduğunuz **`config.json`** dosyasını açıp botunuzun genel bilgilerini düzenleyin.

### 4. Botu Başlatın

Geliştirme aşamasında (otomatik yeniden başlatma ile) çalıştırmak için:
```bash
npm run dev
```

Sadece bir kez çalıştırmak için:
```bash
npm start
```

Projeyi derleyip (build) dağıtıma hazırlamak için:
```bash
npm run build
```

## 📂 Dizin Yapısı

```
├── src/
│   ├── client/       # Özelleştirilmiş BotClient sınıfı
│   ├── commands/     # Slash komutlarınız (ping, botinfo vb.)
│   ├── events/       # Bot olayları (ready, messageCreate vb.)
│   ├── handlers/     # Komut ve Event yükleyicileri
│   └── index.ts      # Ana giriş dosyası
├── .env              # Gizli değişkenleriniz (Token vb.)
├── config.json       # Genel bot ayarlarınız
└── package.json      # Proje bağımlılıkları ve scriptleri
```

## 🤝 Katkıda Bulunma

Bu altyapıyı geliştirmek isterseniz pull request (PR) göndermekten çekinmeyin. Hataları ve istekleri Issues sekmesinden bildirebilirsiniz.

## 📄 Lisans

Bu proje [MIT Lisansı](LICENSE) ile lisanslanmıştır. Dilediğiniz gibi kullanabilir ve değiştirebilirsiniz.
