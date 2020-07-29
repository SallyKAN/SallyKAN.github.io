---
title: This Week I Learnt(1)
tags: What-I-Learnt  Algorithms Go AI
lang: en
---

## Why

I am being quite lazy again to write my blogs these days. Though I know for most time I am just writing them for myself(few persons would read my blog, haha),  it's like to get myself a better understanding of what I've learnt, especially for something really interesting and cool. 

Also, I found myself a kind of person who gets interested in things soon and get wrapped up in them for awhile and then the insterest can easily flag over time. This is not a good habit sometimes, obviously,  and I want to lower the impact from that kind of distraction. On top of that, I am learning  fragmented knowledge all the time, sometimes it's just making me feel hard to pick up again after a long time. So I think it'd be a good idea to record what I have learnt every week(everyday is too hard for me), even with little,plain, non-topic knowledge.

Yeah, basically that's it. Just to make me feel better when I'm struggling learning, for everything.

## **What  I have learnt**

## **Algorithms**
Keep working on Sorting algorithms this week, and good news for me, I have finished the sorting chapter from the book [*Algorithms*](https://algs4.cs.princeton.edu/home/)

**Selection Sorting**
```
 public static void sort(Comparable[] a){
        int N = a.length;
        for (int i=0;i<N;i++){
            int min = i;
            for (int j=i+1;j<N;j++){
                if (less(a[j],a[min])) min = j;
            }
            exch(a,i,min);
        }
```
Basically ,for a N-length array, select sorting would need to compare for N^2/2 and exchange for N times

**Insertion Sorting**
```
public static void sort(Comparable[] a){
        int N = a.length;
        for (int i=1;i<N;i++){
            for (int j=i;j>0 && less(a[j],a[j-1]) ;j--){
                exch(a,j,j-1);
            }
        }
    }
```

For a random, N-length array without repeated keys, insertion sorting would need to compare for around N^2/4 times and exchange for N^2/4 in average.

**Shell Sorting**
```
public static void sort(Comparable[] a) {
        int n = a.length;
        // 3x+1 increment sequence:  1, 4, 13, 40, 121, 364, 1093, ...
        int h = 1;
        while (h < n/3) h = 3*h + 1;
        while (h >= 1) {
            // h-sort the array
            for (int i = h; i < n; i++) {
                for (int j = i; j >= h && less(a[j], a[j-h]); j -= h) {
                    exch(a, j, j-h);
                }
            }
//            assert isHsorted(a, h);
            h /= 3;
        }
```
It's said that calculating the performance of shell sorting can be hard in terms of some mathematical proof.

**Merge Sorting**

First we need to define the merge function
```
public static void merge(Comparable[] a,int lo,int mid,int hi){
        int i=lo,j=mid+1;
        for (int k = lo; k<=hi; k++)
            aux[k] = a[k];
        for (int k=lo;k<=hi;k++){
            if (i>mid) a[k] = aux[j++];
            else if(j>hi) a[k] = aux[i++];
            else if(less(aux[j],aux[i])) a[k] = aux[j++];
            else a[k] = aux[i++];
        }
    }
```

Sort from bottom to up:
```
public static void sort(Comparable[] a){
        int N = a.length;
        aux = new Comparable[N];
        for (int sz =1;sz<N;sz+=sz+sz)
            for (int lo=0;lo<N-sz;lo+=sz+sz)
                merge(a,lo,lo+sz-1,Math.min(lo+sz+sz-1,N-1));
    }
```


Sort from up to bottom:
```
public static void sort(Comparable[] a, Comparable[] aux,int lo,int hi ){
        if (hi <= lo) return;
        int mid = lo+(hi-lo)/2;
        sort(a,aux,lo,mid);
        sort(a,aux,mid+1,hi);
        merge(a,aux,lo,mid,hi);
    }
```

**Quick Sorting**

First need a partition function:
```
public static int partition(Comparable[] a, int lo,int hi){
        int i=lo,j=hi+1;
        Comparable v=a[lo];
        while (true){
            while (less(a[++i],v)) if (i==hi) break;
            while (less(v,a[--j])) if (j==lo) break;
            if (i>=j) break;
            exch(a,i,j);
        }
        exch(a,lo,j);
        return j;
    }
```

Then sort:
```
public static void sort(Comparable[] a,int lo,int hi){
        if (lo >= hi) return;
        int j = partition(a,lo,hi);
        sort(a,lo,j);
        sort(a,j+1,hi);
    }
```

**Priority Queue**

The designed api:
```
public class MaxPQ {
    private Key[] pq;
    private int N = 0;
    public MaxPQ(int N){
        pq = (Key[])new Comparable[N+1];
    }
    public boolean isEmpty(){
        return N==0;
    }
    public int Size(){
        return N;
    }
    public void insert(Key v){
        pq[++N] = v;
        swim(N);
    }
    public Key delMax(){
        Key max = pq[1];
        exch(1,N--);
        pq[N+1] = null;
        sink(1);
        return max;
    }
    public static boolean less(Comparable v, Comparable w){
        return v.compareTo(w) < 0;
    }
    private void exch(int i, int j){
        Key t =pq[i];
        pq[i] = pq[j];
        pq[j] = t;
    }
    public void swim(int k){
        while (k>1&&less(k/2,k)){
            exch(k/2,k);
            k = k/2;
        }
    }
    public void sink(int k){
        while (2*k <= N){
            int j=2*k;
            if (j<N && less(j,j+1)) j++;
            if (!less(k,j)) break;
            exch(k,j);
            k = j;
        }
    }

}
```

To deal with multiway input:
```
public static void merge(In[] streams){
        int N = streams.length;
        IndexMinPQ<String> pq = new IndexMinPQ<String>(N);
        for(int i=0; i<N;i++)
            if(!streams[i].isEmpty())
                pq.insert(i,streams[i].readString());
        while (!pq.isEmpty()){
            StdOut.println(pq.minKey());
            int i = pq.delMin();
            if(!streams[i].isEmpty())
                pq.insert(i,streams[i].readString());
        }
    }
```

**Heap Sorting**
```
public static void sort(Comparable[] a){
        int N = a.length;
        for(int k = N/2;k>=1;k--)
            sink(a,k,N);
        while (N>1)
        {
            exch(a,1,N--);
            sink(a,1,N);
        }
    }
```


## **Golang** 
Some resources I used to understand and solve some specific problems

[Package http](https://golang.org/pkg/net/http/)

[How to create a web server in Go](https://hackernoon.com/how-to-create-a-web-server-in-go-a064277287c9) 

[Making a RESTful JSON API in Go](https://thenewstack.io/make-a-restful-json-api-go/)

[How to write files in Go](https://gobyexample.com/writing-files)

[How to use pprof in Go ](https://golang.org/pkg/runtime/pprof/)

[How to custom pprof profiles](https://rakyll.org/custom-profiles/)


## **Machine Learning**

Some resources I used to understand and solve some specific problems

[What is  Shatter Set?](https://en.wikipedia.org/wiki/Shattered_set)

[What is VC dimension?](	https://en.wikipedia.org/wiki/VC_dimension
https://www.quora.com/Explain-VC-dimension-and-shattering-in-lucid-Way)

[How to calculate average-precision?](	https://sanchom.wordpress.com/tag/average-precision/
)

[What is SVM?](https://www.di.ens.fr/~mallat/papiers/svmtutorial.pdf)

[SVM tutorial](http://web.mit.edu/zoya/www/SVM.pdf)

How you draw a ROC curve?

## **Numpy**
[What is np.where doing?](https://stackoverflow.com/questions/45811119/numpy-where-syntax-from-docs)