/*
풀이 방법
----------------------------------------------------
MaxHeap을 사용

처음 접근한 방법은 다음과 같다.
 1. 알파벳의 개수대로 정렬
 2. 알파벳을 모두 사용할 때 까지 while을 돌림
 3. 현재 사용할 알파벳을 찾음
    한번도 사용되지 않은 알파벳이라면 바로 사용
    사용된 알파벳이라면 cooldown 시간이 지났는지 확인하고 사용
 4. 찾은 알파벳을 다른 배열에 추가
 5. 만약 들어갈 알파벳이 아무것도 없다면 "idle" 추가
 6. while이 끝나고 따로 저장한 배열의 크기를 반환

해당 방법은 예외가 존재한다.
A->3, B->3, C->3, D->2, E->1 라는 예제에서는 최소 시간은 12가 걸린다.(A->B->C->D->A->B->C->D->A->B->C->E)
위와 같은 방식으로 할 때는 다음과 같은 순서대로 진행된다.
(A->B->C->A->B->C->A->B->C->D->E->idle->D)
중간에 D와 같이 끼어들 수 있는 로직이 필요하다.

다음으로 생각한 방식은 한 사이클이 존재하고 이 사이클 안에는 들어올 수 있는 알파벳을 모두 사용하는 것이다.
즉, 위와 같은 예제가 있을때 다음과 같은 결과를 낸다.
( [A->B->C->D->E] -> [A->B->C->D] -> [A->B->C] )
[] -> 한 싸이클

하지만 바로 안된다는 것을 알 수 있는데 문제에 나온 예제 3을 보자.
예제 3 : ["A","A","A","A","A","A","B","C","D","E","F","G"]
위와 같은 방식으로 했을 때 다음과 같은 결과가 나온다.
([A->B->C->D->E->F->G] -> [A->idle->idle] -> [A->idle->idle] -> [A->idle->idle] -> [A->idle->idle] -> [A->idle->idle])
원래 방식보다 더 많은 시간을 보낸다.

아무리 생각을 해봐도 답이 나오지 않아 구글링을 시도하여 안 답안은 다음과 같다.
 1. 알파벳을 따로 저장할 필요가 없음
    각 알파벳의 개수만 알고 있고 이를 사용하기만 하면 되기 때문
 2. 한 사이클은 n + 1로 정함
    같은 알파벳이 n 시간동안 쉬고 나오는 것이 가장 이상적
 3. heap을 통해 항상 개수가 많은 알파벳부터 사용
    가장 개수가 많은 알파벳이 앞에 나와야 휴식을 최소한으로 할 수 있기 때문

*/
var leastInterval = function (tasks, n) {
	// 0을 제외한 알파벳들만 걸러낸다.
	const pq = tasks
		.reduce((s, t) => {
			s[t.charCodeAt(0) - 'A'.charCodeAt(0)] += 1;
			return s;
		}, new Array(26).fill(0))
		.filter((v) => v > 0);

	let time = 0;
	// 모든 task가 끝날때까지
	while (pq.length !== 0) {
		// 개수가 가장 많은 알파벳을 뽑기 위한 정렬
		pq.sort((a, b) => b - a);
		const temp = [];
		// 한 사이클만큼만 task를 처리
		for (let i = 0; i < n + 1; i++) {
			if (pq.length === 0) continue;
			temp.push(pq.shift());
		}
		// 개수를 줄이고 다시 pq에 삽입
		pq.push(...temp.map((v) => v - 1).filter((v) => v > 0));
		// 남은 task가 존재한다면 어차피 한 사이클(n+1)만 돌아간 것이기 때문에 n+1만큼 시간에 더함
		// 만약 뒤에 모든 task가 끝났다면 싸이클을 돌 필요가 없기 때문에 현재 들어간 task의 수만큼만 더함
		time += pq.length === 0 ? temp.length : n + 1;
	}
	return time;
};
