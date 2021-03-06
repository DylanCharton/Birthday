let app = new Vue({
    el: '#app',
    data: {
        friends: [],
        newName: null,
        newLastName : null,
        newDate: null,
        newGenre : null,
        searchKey:'',
        searchGift:'',
        showCreate : true,
        showOne : true,
        showCreateGift : true,
        overlay : true,
        overlayG : true,
        friendIndex : "",
        newPhoto : "",
        newGift : null,
        newYear : null,
    },
    mounted() {
            if (localStorage.getItem('friends')) {
                try {
                    this.friends = JSON.parse(localStorage.getItem('friends'));

                } catch (e) {
                    console.log("Erreur", e)
                    localStorage.removeItem('friends');
                }
                
                
            }
        },
    computed: {
        
        filteredList(){
            
            return _.orderBy(this.friends.filter((friends) =>{
                return friends.name.toLowerCase().includes(this.searchKey.toLowerCase())
            }), 'countdown', 'asc')
            
        },
        filteredGift(){
            
            return this.friends[this.friendIndex].gifts.filter((giftList) =>{
                return giftList.gift.toLowerCase().includes(this.searchGift.toLowerCase())
            })

            
            
        },
        
    },
        
    methods: {
        addFriend() {
            // s'assurer que l'utilisateur a entré quelque chose
            if (!this.newName && !this.newDate) {
                return;
            }
            
            let birthdate = new Date(this.newDate)

            let frBirthdate = birthdate.toLocaleDateString("fr-FR");

            let id = this.generateId();
            this.getBaseSixtyFour()
            
            this.friends.push({
                id : id,
                name: this.newName,
                lastname : this.newLastName,
                date: this.newDate,
                datefr : frBirthdate,
                genre : this.newGenre,
                gifts : [],
                picture : this.newPhoto,
                countdown : this.countdown(this.newDate),
            });
            this.newName = '';
            this.newDate = '';
            this.saveFriends();
        },
        removeFriend(x) {

            this.friends.splice(x, 1);
            for(i = 0; i < this.friends.length; i++){

                this.friends[i].id = i;

            }
            
            
            this.saveFriends();
            
        },
        saveFriends() {
            const parsedFriends = JSON.stringify(this.friends);
            localStorage.setItem('friends', parsedFriends);
        },
        generateId(){
            let id = this.friends.length;
            return id;
        },
        generateGiftId(x){
            let id = this.friends[x].gifts.length;
            
            return id;
        },
        getUser(who){
            
            this.name = this.friends[who].name;
            this.lastname = this.friends[who].lastname
            this.date = this.friends[who].date;
            this.datefr = this.friends[who].datefr;
            this.id = this.friends[who].id;
            this.gifts = this.friends[who].gifts;
            this.picture = this.friends[who].picture;
            this.friendIndex = who;
            
            
        },
        addGift(who){
            if (!this.newYear && !this.newGift) {
                return;
            }
            giftId = this.generateGiftId(who);
            

            let newGift = {
                id : giftId,
                friendId : who,
                year : this.newYear,
                gift : this.newGift,
            }
            
            
            this.friends[who].gifts.push(newGift);
            
            
            this.newYear = '';
            this.newgift = '';

            
            this.saveFriends();

        },
        getBaseSixtyFour(){
            const file = document.querySelector('input[type="file"]').files[0];
            
            const reader = new FileReader();
            
            reader.onloadend = function(){
                app.newPhoto = reader.result  
            };
            reader.readAsDataURL(file);
            


            
        },
        getAge(birthdate){
            let date = new Date();
            let year = date.getFullYear();
            let birthyear = new Date(birthdate).getFullYear();
            let age = year - birthyear;
            countdown = this.countdown(birthdate);

            
            // trying to change the age dynamically because it only reacts to the year and not the month or day
            let friendDate = new Date(birthdate)
            let friendMonth = friendDate.getUTCMonth();
            let friendDay = friendDate.getUTCDate();

            let currentMonth = date.getUTCMonth();
            let currentDay = date.getUTCDate();

            if(currentMonth < friendMonth){
                age = age - 1
                
            } else if (currentMonth == friendMonth){

                if(currentDay < friendDay){
                    age = age - 1
                }
            }

            


            return age;
        },
        countdown(birthdate){
            let date = new Date();
            
            let year = date.getFullYear();
            let friendDate = new Date(birthdate);
            let friendMonth = friendDate.getUTCMonth();
            let friendDay = friendDate.getUTCDate();
            let countdown = new Date(year, friendMonth, friendDay)

            

            if (date.getMonth()+1 > friendMonth && date.getDate()+1 > friendDay){
                countdown.setFullYear(countdown.getFullYear()+1);
            }
            let unixDay = 86400000;
            finalCountdown = Math.ceil((countdown.getTime() - date.getTime()) / (unixDay))

            if(finalCountdown == 365){
                finalCountdown = 0;
            }

            return finalCountdown;
        },
        removeGift(x, index){

            this.friends[x].gifts.splice(index, 1);
            
            for(i = 0; i < this.friends[x].gifts.length; i++){
                
                this.friends[x].gifts[i].id = i;
            }
            
            this.saveFriends();
        },
        
    }
})