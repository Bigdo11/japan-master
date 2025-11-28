window.onload = function() {
    // 버튼
    var hiraganaBtn = document.querySelectorAll('.seg button')[0];
    var katakanaBtn = document.querySelectorAll('.seg button')[1];
    var navBtn1 = document.querySelectorAll('.nav-btn')[0];
    var navBtn2 = document.querySelectorAll('.nav-btn')[1];
    var hiraganaDetail = this.document.querySelector('.hiragana-detail')
    var katakanaDetail = this.document.querySelector('.katakana-detail')

    //그리드
    var hiraganaGrid = document.querySelector('.grid.hiragana');
    var katakanaGrid = document.querySelector('.grid.katakana');

    // 히라가나 버튼 클릭
    hiraganaBtn.onclick = function() {
        hiraganaBtn.setAttribute('aria-pressed', 'true');
        katakanaBtn.removeAttribute('aria-pressed');

        hiraganaGrid.style.display = 'grid';
        katakanaGrid.style.display = 'none';
         katakanaDetail.style.display = 'none';
        hiraganaDetail.style.display = 'inline';
    };

    //가타카나 버튼 클릭
    katakanaBtn.onclick = function() {

        katakanaBtn.setAttribute('aria-pressed', 'true');
        hiraganaBtn.removeAttribute('aria-pressed');

        katakanaGrid.style.display = 'grid';
        hiraganaGrid.style.display = 'none';
        katakanaDetail.style.display = 'inline';
        hiraganaDetail.style.display = 'none';
    };


    //modal inital
    initModal();

    hiraganaBtn.setAttribute('aria-pressed', 'true');
    if (navBtn1) navBtn1.setAttribute('aria-pressed', 'true');
};
   