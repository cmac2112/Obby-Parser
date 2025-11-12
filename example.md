
2024-08-26 08:39

Status:

Tags:[[C Book]], [[C]], [[Programming Language]]

# C Book Ch 1
The [[C]] [[Programming Language]] is a general purpose programming language.

[[C]] is not a very high level language nor a big one and is not specilized to any particular area of application.

[[C]] was designed for and implemented into [[UNIX]] operating systems. Essentially all [[UNIX]] application programs are written in [[C]]

A [[C]] program no matter its size consists of [[Functions]] and [[Variables]].

 #include <stdio.h> tells the compilier to include information about the standard input/output [[C Libraries]], this line will begin most files.

in this example

main(){
printf("hello world\n")
}

main is defined to be a function that expects no arugments
\n is a newline character

# 1.2 Variables and Arithmetic Expressions

#include <stdio.h>

  

int main(){
    int fahr, celcius;
    int lower, upper, step;
    lower = 0; /*lower limit of the temp table*/
    upper = 300; /*upper limit of the temp table*/
    step = 20;  /*step size*/
    fahr = lower;
    while(fahr <= upper){
        celcius = 5 * (fahr-32) / 9;
        printf("%d\t%d\n", fahr, celcius);
        fahr = fahr + step;
    }
}

Comments are defined in [[C]] as /*

in [[C]] all [[Variables]] must be declared before they are used, a declaration announces the properties of variables; it consists of a type name and a list of variables

[[While loop]] was used in this as well

The reason for multiplying by 5 and then dividing by 9 instead of just multiplying by 5/9 is that in [[C]], integer division truncates: any fractional part is discarded. Since 5 and 9 are integers, 5/9 would be truncated to 0.

1.3 The [[For statement loop]]

int main(){
int fahr;
for (fahr = 0; fahr <= 300; fahr + 20){
	printf("%3d %6.1f\n", fahr, (5.0/9.0) * (fahr-32))
}
}
This program gets us the same answer with fewer variables

# 1.4 Symbolic constants
[[Symbolic Constants]] - more definition
It's bad practice to bury "magic numbers" like 300 and 20 into the program; they convey little information to someone who might read the program later
(# define) line defines a symbolic name or symbolic constant to be a particular string of characters
(# define name replacement text)

Therefore after any occurrence of name will be replaced by the corresponding replacement text.

# 1.5 Character Input and Output

The model of input and output supported by the standard library is very simple. Text input or output, regardless of where it originates or where it goes to, is dealt with as streams of characters.

A Text Stream is a sequence of characters divided into lines each line consists of zero or more characters followed by a newline character.

It is the responsibility of the library to make each stream conform to this model.

The standard library provides functions for reading or writing one character at a time, of which [[getchar]] and [[putchar]] are the simplest.

# 1.5.1 file copying

Now that we know [[getchar]] and [[putchar]] lots of useful code can be made

read a character
while(character is not end-of-file indicator)
	output the character just read
		read a character
(#)include <stdio.h>

int main(){
    int c;
    c = getchar();
    while (c != EOF){
        putchar(c);
        c = getchar();
    }
}

# 1.5.2 Character counting

#include <stdio.h>
  
int main(){

    long count;
    count = 0;

    while(getchar() != EOF){

        ++count;

        printf("%d\n", count);

    }

}

the ++ operator increments by 1, the -- decrements. They can either be a prefix or a suffix, sometimes prefix/postfix have different meanings

# word counting plus line counting plus character counting

```


#include <stdio.h>

#define IN 1

#define OUT 0 /*inside or outside a word*/

int main(){
    int cha, nl, nw, nc, state;
    state = OUT;
    nl = nw = nc = 0;
    while((cha = getchar()) != EOF){
        ++nc;
        if (cha == '\n'){
            ++nl;
        };
        if (cha == ' ' || cha == '\n' || cha == '\t'){
           state = OUT;
        }
        else if(state == OUT){
            state = IN;
            ++nw;
        }
    }
    printf("%d %d %d\n", nl, nw, nc);
}
```


# 1.6 Arrays

To continue building off of the previous character count program

lets count the number of occurrences of each digit, of whitespace characters, and all other characters.

There are 12 categories of input possible, so it is convenient to use an array to hold the number of occurrences of each digit, rather than ten individual variables
