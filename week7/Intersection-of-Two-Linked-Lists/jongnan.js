var getIntersectionNode = function (headA, headB) {
	//============================================================
	// 접근 방법 1
	// 해당 문제가 설명이 이상한 점이 있음
	// 1번 예제 처럼  listA = [4,1,8,4,5], listB = [5,6,1,8,4,5]
	// 이 존재할 때, 중복된 구간은 1,8,4,5 가 아닌가?
	// 그렇다면 정답은 1이 되야하지 않는가라는 생각이 들어
	// 말도 안되는 문제다라고 생각하도 솔루션을 참고한 결과
	// 리스트 노드의 밸류 값을 비교하는 것이 아닌 주소 값을 비교
	// 따라서 리스트 A의 1과 리스트 B의 1은 다른 노드이며
	// 리스트 A의 8과 리스트 B의 8은 같은 노드이다.

	// 이점을 활용하여 한 리스트를 Set에 담고 다른 리스트를 순회
	// 하면서 Set에 존재하는지를 확인한다.
	//============================================================
	const set = new Set();
	let a = headA;
	while (a) {
		set.add(a);
		a = a.next;
	}

	let b = headB;
	while (b) {
		if (set.has(b)) return b;
		b = b.next;
	}

	return null;
};
