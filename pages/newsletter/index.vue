<template>
    <div
        class="newsletter-page min-h-screen font-sans leading-relaxed text-gray-80 flex flex-col items-center bg-gray-100"
        
    >
        <!-- Header -->
        <header class="py-4 max-h-[97px] w-screen">
            <div
                id="header-container"
                class="max-w-full mx-auto px-[12px] py-[40px] flex justify-between "
            >
                <NuxtImg
                    src="/img/logo.png"
                    alt="Logo image"
                    class="h-[72px] mx-auto block"
                />
            </div>
        </header>
        <div
            id="content-container"
            class="px-20 py-20 max-w-[960px] min-w-[906px] flex flex-col gap-1"
        >
            <!-- Hero section -->
            <section 
                id="hero-section"
                class="bg-gradient-to-br py-8 text-center w-full h-[277px]" 
            >
                <div class="w-full mx-auto px-4">
                    <div class="flex justify-center gap-4 flex-wrap">
                        <NuxtImg
                            src="/img/hero.JPG"
                            alt="Hero Image"
                            class="w-full"
                        />
                    </div>
                </div>
            </section>

            <!-- About section -->
            <section 
                id="about-section"
                class="py-8"
            >
                <div class="w-full mx-auto px-4">
                    <h2 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
                        Qui sommes nous ?
                    </h2>
                    <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                        🎉 21 ans de ronrons, de sauvetages et d'amour pour les chats errants ! 🐾
                    </p>
                    <p class="text-base md:text-lg text-gray-600 leading-relaxed">
                        Depuis 2004, l'association Les Petits Clochards se mobilise chaque jour pour offrir une seconde chance aux félins des rues. Et nous sommes maintenant sur Instagram !
                    </p>
                </div>
            </section>

            <!-- Missission section -->
            <section
                id="mission-section"
                class="py-8"
            >
                <div class="w-full mx-auto px-4 font-sans">
                    <h2 class="text-2xl md:text-3xl font-bold mb-8 text-gray-800">
                        Nos missions félines...!
                    </h2>
                    <div class="space-y-4">
                        <div class="flex items-center space-x-3">
                            <span class="text-xl">✨</span>
                            <span class="text-lg text-gray-700">Stérilisation</span>
                        </div>
                        <div class="flex items-center space-x-3">
                            <span class="text-xl">✨</span>
                            <span class="text-lg text-gray-700">Identification</span>
                        </div>
                        <div class="flex items-center space-x-3">
                            <span class="text-xl">✨</span>
                            <span class="text-lg text-gray-700">Vaccination</span>
                        </div>
                        <div class="flex items-center space-x-3">
                            <span class="text-xl">✨</span>
                            <span class="text-lg text-gray-700">Soins vétérinaires</span>
                        </div>
                        <div class="flex items-center space-x-3">
                            <span class="text-xl">✨</span>
                            <span class="text-lg text-gray-700">Adoption</span>
                        </div>
                        <div class="flex items-center space-x-3">
                            <span class="text-xl">✨</span>
                            <span class="text-lg text-gray-700">Sensibilisation aux humains</span>
                        </div>
                    </div>
                </div>

            </section>

            <!-- Social section -->
            <section 
                id="social-section"
                class="py-8"
            >
                <div class="w-full mx-auto px-4 font-sans flex flex-col gap-4">
                    <h2 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
                        Restez à l'écoute.
                    </h2>
                    <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-4">
                        🙏 Rejoignez-nous, partagez nos actions, soutenez nos minous… et pourquoi pas, ouvrez votre cœur à l’un d’eux 🐾💕
                    </p>
                    <div
                        id="social-container"
                        class="flex gap-16"
                    >
                        <a href="#" class="flex flex-col items-center gap-4 hover:opacity-75 transition-opacity">
                            <NuxtImg
                                src="/icon/insta.png"
                                class="size-8"
                            />
                            <span>Instagram</span>
                        </a>
                        <a href="#" class="flex flex-col items-center gap-4 hover:opacity-75 transition-opacity ">
                            <NuxtImg
                                src="/icon/facebook.png"
                                class="size-8"
                            />
                            <span>Facebook</span>
                        </a>
                        <a href="#" class="flex flex-col items-center gap-4 hover:opacity-75 transition-opacity">
                            <NuxtImg
                                src="/icon/tiktok.png"
                                class="size-8"
                            />
                            <span>TikTok</span>
                        </a>
                        <a href="#" class="flex flex-col items-center gap-4 hover:opacity-75 transition-opacity">
                            <NuxtImg
                                src="/icon/site-web.png"
                                class="size-8"
                            />
                            <span>Site Web</span>
                        </a>    
                    </div>
                </div>
            </section>

            <!-- Subcribe section -->
            <section
                id="subcribe-section"
                class="py-8 bg-[#F0F2F5]"
            >
                <div class="max-w-4xl mx-auto px-4 font-sans">
                    <h2 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
                        Abonnez-vous à notre Newsletter !
                    </h2>
                    <p class="text-gray-600 mb-4">
                        Ne manquez plus aucune de nos histoires
                    </p>
                    <p class="text-gray-600 mb-2">
                        Recevez chaque mois :
                    </p>
                    <ul class="list-none mb-8 space-y-2 text-gray-700">
                        <li>📖 Les histoires touchantes de nos pensionnaires</li>
                        <li>🎉 Les bonnes nouvelles d'adoptions</li>
                        <li>🆘 Les appels à l'aide pour nos urgences</li>
                        <li>💝 Les témoignages de nos familles adoptantes</li>
                        <li>🎯 Les campagnes de parrainage en cours</li>
                    </ul>

                    <form @submit.prevent="subscribe" class="space-y-6">
                        <div>
                            <input
                                type="email"
                                v-model="email"
                                placeholder="Votre adresse mail *"
                                required
                                class="w-2/4 px-4 py-3 border-2 border-[#809076]/50 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                v-model="firstName"
                                placeholder="Votre prénom (facultatif)"
                                class="w-2/4 px-4 py-3 border-2 border-[#809076]/50 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div class="space-y-3">
                            <div class="flex items-center">
                                <input id="histoires-adoption" type="checkbox" v-model="interests.adoptionStories" class="h-4 w-4 bg-transparent text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                                <label for="histoires-adoption" class="ml-2 block text-sm text-gray-900">Histoires d'adoption</label>
                            </div>
                            <div class="flex items-center">
                                <input id="dons-parrainage" type="checkbox" v-model="interests.donationsSponsorships" class="h-4 w-4 bg-transparent text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                                <label for="dons-parrainage" class="ml-2 block text-sm text-gray-900">Dons et Parrainage</label>
                            </div>
                            <div class="flex items-center">
                                <input id="benevolat" type="checkbox" v-model="interests.volunteering" class="h-4 w-4 bg-transparent text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                                <label for="benevolat" class="ml-2 block text-sm text-gray-900">Bénévolat</label>
                            </div>
                            <div class="flex items-center">
                                <input id="actualites" type="checkbox" v-model="interests.lpcNews" class="h-4 w-4 bg-transparent text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                                <label for="actualites" class="ml-2 block text-sm text-gray-900">Actualités Les Petits Clochards</label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            class="w-auto bg-[#8F9D8A] hover:bg-[#7c8a76] text-white font-semibold py-3 px-6 rounded-md transition duration-150 ease-in-out"
                        >
                            Je m'abonne
                        </button>
                    </form>
                    <div class="mt-6 text-xs text-gray-500 space-y-1">
                        <p>❤️ Vos données restent confidentielles</p>
                        <p>🔒 Désabonnement possible à tout moment</p>
                    </div>
                </div>
            </section>
        </div>
        
        

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');
const firstName = ref('');
const interests = ref({
    adoptionStories: false,
    donationsSponsorships: false,
    volunteering: false,
    lpcNews: false,
});

const subscribe = async () => {
    // Basic validation
    if (!email.value) {
        alert('Veuillez entrer votre adresse e-mail.');
        return;
    }

    const selectedInterests = Object.values(interests.value).some(value => value);
    if (!selectedInterests) {
        alert('Veuillez sélectionner au moins un centre d\'intérêt.');
        return;
    }

    try {
        const response = await fetch('/api/subcriptions/subcribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email.value,
                firstName: firstName.value || null, // Send null if empty
                interests: Object.entries(interests.value)
                    .filter(([_, value]) => value)
                    .map(([key]) => key),
            }),
        });

        if (response.ok) {
            alert('Merci pour votre inscription !');
            // Reset form
            email.value = '';
            firstName.value = '';
            interests.value = {
                adoptionStories: false,
                donationsSponsorships: false,
                volunteering: false,
                lpcNews: false,
            };
        } else {
            const errorData = await response.json();
            alert(`Erreur lors de l'inscription: ${errorData.message || response.statusText}`);
        }
    } catch (error) {
        console.error('Subscription error:', error);
        alert('Une erreur est survenue. Veuillez réessayer.');
    }
};
</script>