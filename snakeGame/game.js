/**
 * 
 */

let ctx = $('#myCanvas')[0].getContext('2d');     //canvas 객체
let w = $('#myCanvas').width();					  //width
let h = $('#myCanvas').height();				  //height

let score = 0;  //점수
let speed = 150; //스피드
let size = 10;   //뱀과 먹이의 크기 (w와 h의 공배수로 작성해야함)
let totalPix_x = w/size-1; 	 
let totalPix_y = h/size-1; 	 
let snake_loc = get_loc();   // 뱀의 위치 초기화
let food_loc = get_loc();    // 먹이의 위치 초기화
let move_interval = null; //move 함수를 인터벌시키기위한 변수

// 조건식 -> 뱀과 먹이의 위치가 동일할때
// 실행문 -> 뱀의 위치를 재설정함
while(snake_loc[0]==food_loc[0]&&snake_loc[1]==food_loc[1]){
	snake_loc = get_loc();
}  

//x,y좌표를 배열로 리턴하는 메소드
function get_loc(){
	return [random(0,totalPix_x)*size,random(0,totalPix_y)*size];
}
//사각형(뱀,먹이)를 그려주는 메소드
function fillObj(color,obj_arr){
	ctx.fillStyle = color;
	ctx.fillRect(obj_arr[0],obj_arr[1],size,size);
}
	

// 뱀과 먹이를 그리기
fillObj('pink', food_loc);
fillObj('green', snake_loc);

// min~max 범위의 랜덤한 정수를 리턴하는 메소드 
//-> random(10,1)은 1~10까지의 무작위 정수를 리턴함 
function random(max,min){
	return Math.round((Math.random()*(max-min))+min);
}

//점수를 html에 적어주는 메소드 -speedUp추가됨
function getScore(){
	$('#current').text(++score);
	switch(score){
	case 5 : speedUp(); break;
	case 10 : speedUp(); break;
	case 15 : speedUp(); break;
	case 20 : speedUp(); break;
	case 25 : speedUp(); break;
	case 30 : speedUp(); break;
	case 35 : speedUp(); break;
	case 40 : speedUp(); break;
	case 45 : speedUp(); break;
	case 45 : speedUp(); break;
	default : break;
	}
}

//새로운 먹이의 위치를 정하고, 그려주는 메소드
//조건문 -> 뱀과 먹이의 위치가 같으면 먹이의 위치를 재설정함
function newFood(){
	while(snake_loc[0]==food_loc[0]&&snake_loc[1]==food_loc[1]){
		food_loc = get_loc();
	}
	fillObj('pink', food_loc);
}

//속도빠르게함
function speedUp(){
	speed -= 10;
}

//뱀의 위치가 canvas에서 벗어나면 게임을 종료시키는 메소드
function gameOver(){
	if(snake_loc[0]<0||snake_loc[0]>w-size){
		clearInterval(move_interval);
		msg_gameOver();
	} else if(snake_loc[1]<0||snake_loc[1]>h-size){
		clearInterval(move_interval);
		msg_gameOver();
	}
}

function msg_gameOver(){
	alert('GameOver');
	window.location.reload();
}



// 키다운이벤트 추가  e.keyCode는 누른 키의 정보를 담고있음 
//-> 37:왼쪽 38:위쪽 39:오른쪽 40:아래쪽
// 기존의 인터벌이 있을수있으니 clearInterval 한후
// 각방향의 move 메소드를 호출하여 인터벌시킨다.
	$(this).keyup(function(e) {
		switch(e.keyCode){
		case 37 :
		clearInterval(move_interval);
		move_interval = setInterval(move_left, speed);	
		break;
		case 38 :
		clearInterval(move_interval);
		move_interval = setInterval(move_up, speed);
		break;
		case 39 : 
		clearInterval(move_interval);
		move_interval = setInterval(move_right, speed);
		break;
		case 40 : 
		clearInterval(move_interval);
		move_interval = setInterval(move_down, speed);
		break;
		default : break;
		}
	});

// move 메소드는 기존의 뱀위치를 검은색으로 색칠 -> 뱀의 위치 증감시키기
// 증감된 위치 색칠 -> 뱀과 먹이의 위치가 같다면 getScore, newFood 메소드호출
// -> 항시 gameOver메소드 호출로 진행된다.(gameOver 메소드 안에서 조건문으로 검사)
	
function move_right(){
	fillObj('black', snake_loc);
	snake_loc[0]+=size;
	ctx.fillStyle = 'green';
	fillObj('green', snake_loc);
	if(snake_loc[0]==food_loc[0]&&snake_loc[1]==food_loc[1]){
		getScore();
		newFood();
	}
	gameOver();
}
function move_left(){
	fillObj('black', snake_loc);
	snake_loc[0] -=size;
	fillObj('green', snake_loc);
	if(snake_loc[0]==food_loc[0]&&snake_loc[1]==food_loc[1]){
		getScore();
		newFood();
	}
	gameOver();
}
function move_up(){
	fillObj('black', snake_loc);
	snake_loc[1] -=size;
	fillObj('green', snake_loc);
	if(snake_loc[0]==food_loc[0]&&snake_loc[1]==food_loc[1]){
		getScore();
		newFood();
	}
	gameOver();
}
function move_down(){
	fillObj('black', snake_loc);
	snake_loc[1] +=size;
	fillObj('green', snake_loc);
	if(snake_loc[0]==food_loc[0]&&snake_loc[1]==food_loc[1]){
		getScore();
		newFood();
	}
	gameOver();
}
