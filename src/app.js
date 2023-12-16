  document.addEventListener('alpine:init', () => {
        Alpine.data('products', () => ({
           items: [
            { id: 1, name:'Americano', img:'1.jpg', price: 27000},
            { id: 2, name:'Matcha Latte', img:'2.jpg', price: 34000},
            { id: 3, name:'Choco Latte', img:'3.jpg', price: 42000},
            { id: 4, name:'Espresso', img:'4.jpg', price: 23000},
            { id: 5, name:'Rose Tea', img:'5.jpg', price: 21000}
        ],
        }));

        Alpine.store('cart', {
            items: [],
            total: 0,
            quantity: 0,
            // add(newItem){
            //   // cek apakah ada barang yg sama di cart
            //   const cartItem = this.items.find((item) => item.id === newItem.id);

            //   // jika belum ada / cart masih kosong
            //   if(!cartItem) {
            //     this.items.push({...newItem, quantity: 1, total: newItem.price});
            //     this.quantity++;
            //     this.total += newItem.price;
            //   } else{
            //     // jika barang sudah ada ,cek apakah  barang beda atu sama
            //     this.items = this.items.map((item) => {
            //       // jika barang berbeda
            //       if(item.id !== newItem.id){
            //         return item;
            //       }else{
            //         // jika barang sudah ada , tambah quantity dan total
            //         this.quantity++;
            //         this.total = item.price * item.quantity;
            //         this.quantity++;
            //         this.total += item.price;
            //         return item;
            //       }
            //     })
            //   }
            // },
            add(newItem) {
                // cek apakah ada barang yg sama di cart
                const cartItem = this.items.find((item) => item.id === newItem.id);

                // jika belum ada / cart masih kosong
                if (!cartItem) {
                  this.items.push({ ...newItem, quantity: 1, total: newItem.price });
                  this.quantity++;
                  this.total += newItem.price;
                } else {
                  // jika barang sudah ada, tambahkan quantity dan perbarui total
                  cartItem.quantity++;
                  cartItem.total = cartItem.price * cartItem.quantity;
                  this.quantity++;
                  this.total += cartItem.price;
                }
            },
            // remove(id){
            //   // ambil item yg di remove berdasarkan id 
            //   const cartItem = this.items.find((item) => item.id === id);

            //   // jika item lebih dari 1
            //   if (cartItem.quantity > 1){
            //     // telusuri 1 1
            //     this.items = this.items.map((item) => {
            //       // jika bukan barang yg diklik
            //       if(item.id !== id){
            //         return item;
            //       }else{
            //         item.quantity--;
            //         item.total = item.price * item.quantity;
            //         this.quantity--;
            //         this.total -= item.price;
            //         return item;
            //       }
            //     });
            //   }
            // }
            remove(id) {
  // Ambil item yang akan dihapus berdasarkan ID
  const cartItemIndex = this.items.findIndex((item) => item.id === id);

  // Pastikan item ditemukan di keranjang
  if (cartItemIndex !== -1) {
    const cartItem = this.items[cartItemIndex];

    // Jika jumlah item lebih dari 1
    if (cartItem.quantity > 1) {
      // Kurangi jumlah item dan perbarui total
      cartItem.quantity--;
      cartItem.total = cartItem.price * cartItem.quantity;
      this.quantity--;
      this.total -= cartItem.price;
    } else {
      // Jika hanya ada 1 item, hapus dari keranjang
      this.quantity--;
      this.total -= cartItem.price;
      this.items.splice(cartItemIndex, 1);
    }
  }
}

        });

    });

// Form validation
// const checkoutButton = document.querySelector('.checkout-button');
// checkoutButton.disabled = true;

// const form = document.querySelector('#checkoutForm');

// form.addEventListener('keyup', function(){
//   for(let i = 0; i< form.elements.length; i++){
//     if(form.elements[i].value.length !== 0){
//       checkoutButton.classList.remove('disabled');
//       checkoutButton.classList.add('disabled');
//     }else{
//       return false;
//     }
//   }

//   checkoutButton.disabled = false;
//   checkoutButton.classList.remove['disabled'];
// });

const checkoutButton = document.querySelector('.checkout-button');
checkoutButton.disabled = true;

const form = document.querySelector('#checkoutForm');

const inputs = form.querySelectorAll('input');

form.addEventListener('input', function () {
  let allFilled = true;

  inputs.forEach((input) => {
    if (input.value.trim() === '') {
      allFilled = false;
    }
  });

  if (allFilled) {
    checkoutButton.disabled = false;
    checkoutButton.classList.remove('disabled');
  } else {
    checkoutButton.disabled = true;
    checkoutButton.classList.add('disabled');
  }
});

// kirim data ketika tombol checkout diklik
checkoutButton.addEventListener('click', function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  const objData = Object.fromEntries(data);
  const message = formatMessage(objData);
  window.open('http://wa.me/6283815874702?text=' + encodeURIComponent(message));
});

// format pesan whatsapp
const formatMessage = (obj) => {
  return `Data Customer
  Nama: ${obj.name}
  Email: ${obj.email}
  No HP: ${obj.phone}
Data Pesanan
  ${JSON.parse(obj.items).map((item) => `${item.name} (${item.quantity} x ${rupiah(item.total)}) \n`)}
  TOTAL: ${rupiah(obj.total)}
  Terima kasih.`;
}


// konversi ke rupiah 
const rupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number);
}



