#include <iostream>

using namespace std;

class A {
    private: 
        int i;
    public: 
        A(){ i = 0; }
        ~A(){}
        void print(){
            cout << "print " << i << endl;
        }
        void set(int i){ this->i = i; }
};

class B : public A {
    // nothing
};

int main()
{
    B b;
    b.set(10);
    b.print();

    return 0;
};